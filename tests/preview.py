"""Local-only preview, without browser caching; optional first catalog failure for retry QA."""
import argparse
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlsplit

parser = argparse.ArgumentParser()
parser.add_argument('--port', type=int, default=4219)
parser.add_argument('--fail-first-catalog', action='store_true')
args = parser.parse_args()
root = Path(__file__).resolve().parent.parent

class Preview(SimpleHTTPRequestHandler):
    failed = False
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=str(root), **kw)
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()
    def do_GET(self):
        if args.fail_first_catalog and not Preview.failed and urlsplit(self.path).path == '/catalog.json':
            Preview.failed = True
            self.send_error(503, 'Intentional catalog failure for retry QA')
            return
        super().do_GET()
    def log_message(self, *a):
        pass

print(f'Preview: http://127.0.0.1:{args.port}/prices.html', flush=True)
ThreadingHTTPServer(('127.0.0.1', args.port), Preview).serve_forever()
