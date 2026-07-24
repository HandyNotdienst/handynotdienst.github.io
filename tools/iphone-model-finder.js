const PHOTO_HINTS = {
      old_plastic_back: "../assets/model-finder/v12/colors/iphone-3g.webp",
      old_glass_back: "../assets/model-finder/v12/colors/iphone-4.webp",
      old_aluminum_back: "../assets/model-finder/v12/colors/iphone.webp",
      shiny_text: "../assets/model-finder/v12/colors/iphone-3gs.webp",
      matte_text: "../assets/model-finder/v12/colors/iphone-3g.webp",
      pill_camera: "../assets/model-finder/v12/camera-pill.webp",
      square_camera: "../assets/model-finder/v12/camera-dual-square-a.webp",
      gold_back: "../assets/model-finder/v12/colors/iphone-xs.webp",
      silver_gray: "../assets/model-finder/v12/colors/iphone-x.webp",
      rose_gold: "../assets/model-finder/v12/colors/iphone-se-1.webp",
      not_rose_gold: "../assets/model-finder/v12/colors/iphone-5s.webp",
      settings_about: "../assets/model-finder/v12/settings-about.webp",
      settings_model_tap: "../assets/model-finder/v12/settings-about.webp",
      sim_tray_lookup: "../assets/model-finder/v12/sim-tray.webp",
      connector_lookup: "../assets/model-finder/v12/connector-lookup.webp",
      lightning_port: "../assets/model-finder/v12/port-lightning.webp",
      usb_c_port: "../assets/model-finder/v12/port-usb-c.webp",
      back_cover_lookup: "../assets/model-finder/v12/back-cover-lookup.webp",
      old_back_cover_lookup: "../assets/model-finder/v12/back-cover-lookup.webp",
      original_exterior: "../assets/model-finder/v12/original-exterior.webp",
      home_button: "../assets/model-finder/v12/front-home-button.webp",
      no_home_button: "../assets/model-finder/v12/front-notch-left.webp",
      dynamic_island: "../assets/model-finder/v12/front-dynamic-island.webp",
      notch: "../assets/model-finder/v12/front-notch-left.webp",
      camera_one: "../assets/model-finder/v12/camera-single.webp",
      camera_two: "../assets/model-finder/v12/camera-dual-square-a.webp",
      camera_three: "../assets/model-finder/v12/camera-triple-a.webp",
      camera_diagonal: "../assets/model-finder/v12/camera-dual-diagonal.webp",
      camera_vertical: "../assets/model-finder/v12/camera-dual-square-b.webp",
      camera_control: "../assets/model-finder/v12/feature-design.webp",
      no_camera_control: "../assets/model-finder/v12/feature-design.webp",
      action_button: "../assets/model-finder/v12/feature-design.webp",
      mute_switch: "../assets/model-finder/v12/feature-design.webp",
      plateau_extended: "../assets/model-finder/v12/camera-air-single.webp",
      standard_camera_bump: "../assets/model-finder/v12/camera-triple-b.webp",
      glass_back: "../assets/model-finder/v12/colors/iphone-8.webp",
      aluminum_back: "../assets/model-finder/v12/colors/iphone-6.webp",
      plastic_back: "../assets/model-finder/v12/colors/iphone-5c.webp",
      headphone_jack: "../assets/model-finder/v12/colors/iphone-6s.webp",
      no_headphone_jack: "../assets/model-finder/v12/colors/iphone-7.webp",
      engraved_s: "../assets/model-finder/v12/colors/iphone-6s.webp",
      flat_edges: "../assets/model-finder/v12/flat-rounded-edges.webp",
      rounded_edges: "../assets/model-finder/v12/flat-rounded-edges.webp",
      size_small: "../assets/model-finder/v12/colors/iphone-13-mini.webp",
      size_standard: "../assets/model-finder/v12/colors/iphone-17.webp",
      size_large: "../assets/model-finder/v12/colors/iphone-17-pro-max.webp",
      soft_pink: "../assets/model-finder/v12/colors/iphone-17e.webp",
      black_white_e: "../assets/model-finder/v12/colors/iphone-16e.webp",
      unique_13: "../assets/model-finder/v12/colors/iphone-13.webp",
      unique_14: "../assets/model-finder/v12/colors/iphone-14.webp",
      unique_12pro: "../assets/model-finder/v12/colors/iphone-12-pro.webp",
      unique_13pro: "../assets/model-finder/v12/colors/iphone-13-pro.webp",
      unique_16: "../assets/model-finder/v12/colors/iphone-16.webp",
      unique_17: "../assets/model-finder/v12/colors/iphone-17.webp",
      box_receipt: "../assets/model-finder/v12/help-illustration.webp",
      retail_label: "../assets/model-finder/v12/help-illustration.webp"
    };

    const MODEL_COLOR_IMAGES = {
      "iPhone": "iphone.webp",
      "iPhone 3G": "iphone-3g.webp",
      "iPhone 3GS": "iphone-3gs.webp",
      "iPhone 4": "iphone-4.webp",
      "iPhone 4s": "iphone-4s.webp",
      "iPhone 5": "iphone-5.webp",
      "iPhone 5c": "iphone-5c.webp",
      "iPhone 5s": "iphone-5s.webp",
      "iPhone SE (1st generation)": "iphone-se-1.webp",
      "iPhone 6": "iphone-6.webp",
      "iPhone 6 Plus": "iphone-6-plus.webp",
      "iPhone 6s": "iphone-6s.webp",
      "iPhone 6s Plus": "iphone-6s-plus.webp",
      "iPhone 7": "iphone-7.webp",
      "iPhone 7 Plus": "iphone-7-plus.webp",
      "iPhone 8": "iphone-8.webp",
      "iPhone 8 Plus": "iphone-8-plus.webp",
      "iPhone X": "iphone-x.webp",
      "iPhone XR": "iphone-xr.webp",
      "iPhone XS": "iphone-xs.webp",
      "iPhone XS Max": "iphone-xs-max.webp",
      "iPhone 11": "iphone-11.webp",
      "iPhone 11 Pro": "iphone-11-pro.webp",
      "iPhone 11 Pro Max": "iphone-11-pro-max.webp",
      "iPhone SE (2nd generation)": "iphone-se-2.webp",
      "iPhone SE (3rd generation)": "iphone-se-3.webp",
      "iPhone 12": "iphone-12.webp",
      "iPhone 12 mini": "iphone-12-mini.webp",
      "iPhone 12 Pro": "iphone-12-pro.webp",
      "iPhone 12 Pro Max": "iphone-12-pro-max.webp",
      "iPhone 13": "iphone-13.webp",
      "iPhone 13 mini": "iphone-13-mini.webp",
      "iPhone 13 Pro": "iphone-13-pro.webp",
      "iPhone 13 Pro Max": "iphone-13-pro-max.webp",
      "iPhone 14": "iphone-14.webp",
      "iPhone 14 Plus": "iphone-14-plus.webp",
      "iPhone 14 Pro": "iphone-14-pro.webp",
      "iPhone 14 Pro Max": "iphone-14-pro-max.webp",
      "iPhone 15": "iphone-15.webp",
      "iPhone 15 Plus": "iphone-15-plus.webp",
      "iPhone 15 Pro": "iphone-15-pro.webp",
      "iPhone 15 Pro Max": "iphone-15-pro-max.webp",
      "iPhone 16": "iphone-16.webp",
      "iPhone 16 Plus": "iphone-16-plus.webp",
      "iPhone 16 Pro": "iphone-16-pro.webp",
      "iPhone 16 Pro Max": "iphone-16-pro-max.webp",
      "iPhone 16e": "iphone-16e.webp",
      "iPhone 17": "iphone-17.webp",
      "iPhone 17e": "iphone-17e.webp",
      "iPhone 17 Pro": "iphone-17-pro.webp",
      "iPhone 17 Pro Max": "iphone-17-pro-max.webp",
      "iPhone Air": "iphone-air.webp"
    };

    const COLOR_ICONS = {
      "Black": "",
      "White": "",
      "Blue": "",
      "Green": "",
      "Yellow": "",
      "Pink": "",
      "Red": "",
      "Purple": "",
      "Starlight": "",
      "Midnight": "",
      "Graphite": "",
      "Silver": "",
      "Gold": "",
      "Sierra Blue": "",
      "Alpine Green": "",
      "Pacific Blue": "",
      "Midnight Green": "",
      "Space Gray": "",
      "Space Black": "",
      "Deep Purple": "",
      "Black Titanium": "",
      "White Titanium": "",
      "Natural Titanium": "",
      "Desert Titanium": "",
      "Teal": "",
      "Ultramarine": "",
      "Mist Blue": "",
      "Sage": "",
      "Lavender": "",
      "Cloud White": "",
      "Light Gold": "",
      "Sky Blue": "",
      "Soft Pink": "",
      "Cosmic Orange": "",
      "Deep Blue": ""
    };

    const A_NUMBER_MAP = {
      A1203: "iPhone",
      A1241: "iPhone 3G",
      A1324: "iPhone 3G",
      A1303: "iPhone 3GS",
      A1325: "iPhone 3GS",
      A1332: "iPhone 4",
      A1349: "iPhone 4",
      A1387: "iPhone 4s",
      A1431: "iPhone 4s",
      A1428: "iPhone 5",
      A1429: "iPhone 5",
      A1442: "iPhone 5",
      A1456: "iPhone 5c",
      A1507: "iPhone 5c",
      A1516: "iPhone 5c",
      A1526: "iPhone 5c",
      A1529: "iPhone 5c",
      A1532: "iPhone 5c",
      A1453: "iPhone 5s",
      A1457: "iPhone 5s",
      A1518: "iPhone 5s",
      A1528: "iPhone 5s",
      A1530: "iPhone 5s",
      A1533: "iPhone 5s",
      A1662: "iPhone SE (1st generation)",
      A1723: "iPhone SE (1st generation)",
      A1724: "iPhone SE (1st generation)",
      A1549: "iPhone 6",
      A1586: "iPhone 6",
      A1589: "iPhone 6",
      A1522: "iPhone 6 Plus",
      A1524: "iPhone 6 Plus",
      A1593: "iPhone 6 Plus",
      A1633: "iPhone 6s",
      A1688: "iPhone 6s",
      A1691: "iPhone 6s",
      A1700: "iPhone 6s",
      A1634: "iPhone 6s Plus",
      A1687: "iPhone 6s Plus",
      A1690: "iPhone 6s Plus",
      A1699: "iPhone 6s Plus",
      A1660: "iPhone 7",
      A1778: "iPhone 7",
      A1779: "iPhone 7",
      A1780: "iPhone 7",
      A1661: "iPhone 7 Plus",
      A1784: "iPhone 7 Plus",
      A1785: "iPhone 7 Plus",
      A1786: "iPhone 7 Plus",
      A1863: "iPhone 8",
      A1905: "iPhone 8",
      A1906: "iPhone 8",
      A1907: "iPhone 8",
      A1864: "iPhone 8 Plus",
      A1897: "iPhone 8 Plus",
      A1898: "iPhone 8 Plus",
      A1899: "iPhone 8 Plus",
      A1865: "iPhone X",
      A1901: "iPhone X",
      A1902: "iPhone X",
      A1984: "iPhone XR",
      A2105: "iPhone XR",
      A2106: "iPhone XR",
      A2107: "iPhone XR",
      A2108: "iPhone XR",
      A1920: "iPhone XS",
      A2097: "iPhone XS",
      A2098: "iPhone XS",
      A2099: "iPhone XS",
      A2100: "iPhone XS",
      A1921: "iPhone XS Max",
      A2101: "iPhone XS Max",
      A2102: "iPhone XS Max",
      A2103: "iPhone XS Max",
      A2104: "iPhone XS Max",
      A2111: "iPhone 11",
      A2221: "iPhone 11",
      A2223: "iPhone 11",
      A2160: "iPhone 11 Pro",
      A2215: "iPhone 11 Pro",
      A2217: "iPhone 11 Pro",
      A2161: "iPhone 11 Pro Max",
      A2218: "iPhone 11 Pro Max",
      A2220: "iPhone 11 Pro Max",
      A2275: "iPhone SE (2nd generation)",
      A2296: "iPhone SE (2nd generation)",
      A2298: "iPhone SE (2nd generation)",
      A2176: "iPhone 12 mini",
      A2398: "iPhone 12 mini",
      A2399: "iPhone 12 mini",
      A2400: "iPhone 12 mini",
      A2172: "iPhone 12",
      A2402: "iPhone 12",
      A2403: "iPhone 12",
      A2404: "iPhone 12",
      A2341: "iPhone 12 Pro",
      A2406: "iPhone 12 Pro",
      A2407: "iPhone 12 Pro",
      A2408: "iPhone 12 Pro",
      A2342: "iPhone 12 Pro Max",
      A2410: "iPhone 12 Pro Max",
      A2411: "iPhone 12 Pro Max",
      A2412: "iPhone 12 Pro Max",
      A2481: "iPhone 13 mini",
      A2626: "iPhone 13 mini",
      A2628: "iPhone 13 mini",
      A2629: "iPhone 13 mini",
      A2630: "iPhone 13 mini",
      A2482: "iPhone 13",
      A2631: "iPhone 13",
      A2633: "iPhone 13",
      A2634: "iPhone 13",
      A2635: "iPhone 13",
      A2483: "iPhone 13 Pro",
      A2636: "iPhone 13 Pro",
      A2638: "iPhone 13 Pro",
      A2639: "iPhone 13 Pro",
      A2640: "iPhone 13 Pro",
      A2484: "iPhone 13 Pro Max",
      A2641: "iPhone 13 Pro Max",
      A2643: "iPhone 13 Pro Max",
      A2644: "iPhone 13 Pro Max",
      A2645: "iPhone 13 Pro Max",
      A2595: "iPhone SE (3rd generation)",
      A2782: "iPhone SE (3rd generation)",
      A2783: "iPhone SE (3rd generation)",
      A2784: "iPhone SE (3rd generation)",
      A2785: "iPhone SE (3rd generation)",
      A2649: "iPhone 14",
      A2881: "iPhone 14",
      A2882: "iPhone 14",
      A2883: "iPhone 14",
      A2884: "iPhone 14",
      A2632: "iPhone 14 Plus",
      A2885: "iPhone 14 Plus",
      A2886: "iPhone 14 Plus",
      A2887: "iPhone 14 Plus",
      A2888: "iPhone 14 Plus",
      A2650: "iPhone 14 Pro",
      A2889: "iPhone 14 Pro",
      A2890: "iPhone 14 Pro",
      A2891: "iPhone 14 Pro",
      A2892: "iPhone 14 Pro",
      A2651: "iPhone 14 Pro Max",
      A2893: "iPhone 14 Pro Max",
      A2894: "iPhone 14 Pro Max",
      A2895: "iPhone 14 Pro Max",
      A2896: "iPhone 14 Pro Max",
      A2846: "iPhone 15",
      A3089: "iPhone 15",
      A3090: "iPhone 15",
      A3092: "iPhone 15",
      A2847: "iPhone 15 Plus",
      A3093: "iPhone 15 Plus",
      A3094: "iPhone 15 Plus",
      A3096: "iPhone 15 Plus",
      A2848: "iPhone 15 Pro",
      A3101: "iPhone 15 Pro",
      A3102: "iPhone 15 Pro",
      A3104: "iPhone 15 Pro",
      A2849: "iPhone 15 Pro Max",
      A3105: "iPhone 15 Pro Max",
      A3106: "iPhone 15 Pro Max",
      A3108: "iPhone 15 Pro Max",
      A3081: "iPhone 16",
      A3286: "iPhone 16",
      A3287: "iPhone 16",
      A3288: "iPhone 16",
      A3082: "iPhone 16 Plus",
      A3289: "iPhone 16 Plus",
      A3290: "iPhone 16 Plus",
      A3291: "iPhone 16 Plus",
      A3083: "iPhone 16 Pro",
      A3292: "iPhone 16 Pro",
      A3293: "iPhone 16 Pro",
      A3294: "iPhone 16 Pro",
      A3084: "iPhone 16 Pro Max",
      A3295: "iPhone 16 Pro Max",
      A3296: "iPhone 16 Pro Max",
      A3297: "iPhone 16 Pro Max",
      A3212: "iPhone 16e",
      A3408: "iPhone 16e",
      A3409: "iPhone 16e",
      A3410: "iPhone 16e",
      A3258: "iPhone 17",
      A3519: "iPhone 17",
      A3520: "iPhone 17",
      A3521: "iPhone 17",
      A3260: "iPhone Air",
      A3516: "iPhone Air",
      A3517: "iPhone Air",
      A3518: "iPhone Air",
      A3256: "iPhone 17 Pro",
      A3522: "iPhone 17 Pro",
      A3523: "iPhone 17 Pro",
      A3524: "iPhone 17 Pro",
      A3257: "iPhone 17 Pro Max",
      A3525: "iPhone 17 Pro Max",
      A3526: "iPhone 17 Pro Max",
      A3527: "iPhone 17 Pro Max",
      A3575: "iPhone 17e",
      A3634: "iPhone 17e",
      A3635: "iPhone 17e"
    };

    const MODEL_DATA = {
      "iPhone 15": [
            {
                  "name": "Black",
                  "hex": "#2d3136"
            },
            {
                  "name": "Blue",
                  "hex": "#d7e4ea"
            },
            {
                  "name": "Green",
                  "hex": "#d9f1df"
            },
            {
                  "name": "Yellow",
                  "hex": "#f6efbe"
            },
            {
                  "name": "Pink",
                  "hex": "#f6d5de"
            }
      ],
      "iPhone 15 Plus": [
            {
                  "name": "Black",
                  "hex": "#2d3136"
            },
            {
                  "name": "Blue",
                  "hex": "#d7e4ea"
            },
            {
                  "name": "Green",
                  "hex": "#d9f1df"
            },
            {
                  "name": "Yellow",
                  "hex": "#f6efbe"
            },
            {
                  "name": "Pink",
                  "hex": "#f6d5de"
            }
      ],
      "iPhone 15 Pro": [
            {
                  "name": "Black Titanium",
                  "hex": "#3d3c3a"
            },
            {
                  "name": "White Titanium",
                  "hex": "#f4f3ee"
            },
            {
                  "name": "Blue Titanium",
                  "hex": "#5f6b7a"
            },
            {
                  "name": "Natural Titanium",
                  "hex": "#a79c8c"
            }
      ],
      "iPhone 15 Pro Max": [
            {
                  "name": "Black Titanium",
                  "hex": "#3d3c3a"
            },
            {
                  "name": "White Titanium",
                  "hex": "#f4f3ee"
            },
            {
                  "name": "Blue Titanium",
                  "hex": "#5f6b7a"
            },
            {
                  "name": "Natural Titanium",
                  "hex": "#a79c8c"
            }
      ],
      "iPhone 16": [
            {
                  "name": "Black",
                  "hex": "#2c2c2e"
            },
            {
                  "name": "White",
                  "hex": "#f5f5f7"
            },
            {
                  "name": "Pink",
                  "hex": "#f7c9d9"
            },
            {
                  "name": "Teal",
                  "hex": "#a8e5dd"
            },
            {
                  "name": "Ultramarine",
                  "hex": "#7f83ff"
            }
      ],
      "iPhone 16 Plus": [
            {
                  "name": "Black",
                  "hex": "#2c2c2e"
            },
            {
                  "name": "White",
                  "hex": "#f5f5f7"
            },
            {
                  "name": "Pink",
                  "hex": "#f7c9d9"
            },
            {
                  "name": "Teal",
                  "hex": "#a8e5dd"
            },
            {
                  "name": "Ultramarine",
                  "hex": "#7f83ff"
            }
      ],
      "iPhone 16 Pro": [
            {
                  "name": "Black Titanium",
                  "hex": "#3f4042"
            },
            {
                  "name": "White Titanium",
                  "hex": "#f1f1ea"
            },
            {
                  "name": "Natural Titanium",
                  "hex": "#b7ad9f"
            },
            {
                  "name": "Desert Titanium",
                  "hex": "#c89d71"
            }
      ],
      "iPhone 16 Pro Max": [
            {
                  "name": "Black Titanium",
                  "hex": "#3f4042"
            },
            {
                  "name": "White Titanium",
                  "hex": "#f1f1ea"
            },
            {
                  "name": "Natural Titanium",
                  "hex": "#b7ad9f"
            },
            {
                  "name": "Desert Titanium",
                  "hex": "#c89d71"
            }
      ],
      "iPhone 16e": [
            {
                  "name": "Black",
                  "hex": "#2b2b2d"
            },
            {
                  "name": "White",
                  "hex": "#f4f4f6"
            }
      ],
      "iPhone 17": [
            {
                  "name": "Black",
                  "hex": "#242426"
            },
            {
                  "name": "White",
                  "hex": "#f3f3f1"
            },
            {
                  "name": "Mist Blue",
                  "hex": "#d7e9f6"
            },
            {
                  "name": "Sage",
                  "hex": "#dce7d8"
            },
            {
                  "name": "Lavender",
                  "hex": "#e6def8"
            }
      ],
      "iPhone Air": [
            {
                  "name": "Space Black",
                  "hex": "#2d2d30"
            },
            {
                  "name": "Cloud White",
                  "hex": "#f6f6f3"
            },
            {
                  "name": "Light Gold",
                  "hex": "#efe0c8"
            },
            {
                  "name": "Sky Blue",
                  "hex": "#dceaf7"
            }
      ],
      "iPhone 17 Pro": [
            {
                  "name": "Silver",
                  "hex": "#f4f3ef"
            },
            {
                  "name": "Cosmic Orange",
                  "hex": "#d38b52"
            },
            {
                  "name": "Deep Blue",
                  "hex": "#4d607c"
            }
      ],
      "iPhone 17 Pro Max": [
            {
                  "name": "Silver",
                  "hex": "#f4f3ef"
            },
            {
                  "name": "Cosmic Orange",
                  "hex": "#d38b52"
            },
            {
                  "name": "Deep Blue",
                  "hex": "#4d607c"
            }
      ],
      "iPhone 17e": [
            {
                  "name": "Black",
                  "hex": "#2b2b2d"
            },
            {
                  "name": "White",
                  "hex": "#f4f4f6"
            },
            {
                  "name": "Soft Pink",
                  "hex": "#f6d7df"
            }
      ],
      "iPhone 14": [
            {
                  "name": "Midnight",
                  "hex": "#2d2d32"
            },
            {
                  "name": "Starlight",
                  "hex": "#f2eedf"
            },
            {
                  "name": "Blue",
                  "hex": "#b8d5f0"
            },
            {
                  "name": "Purple",
                  "hex": "#d8cff0"
            },
            {
                  "name": "Red",
                  "hex": "#d71f37"
            },
            {
                  "name": "Yellow",
                  "hex": "#f3e45c"
            }
      ],
      "iPhone 14 Plus": [
            {
                  "name": "Midnight",
                  "hex": "#2d2d32"
            },
            {
                  "name": "Starlight",
                  "hex": "#f2eedf"
            },
            {
                  "name": "Blue",
                  "hex": "#b8d5f0"
            },
            {
                  "name": "Purple",
                  "hex": "#d8cff0"
            },
            {
                  "name": "Red",
                  "hex": "#d71f37"
            },
            {
                  "name": "Yellow",
                  "hex": "#f3e45c"
            }
      ],
      "iPhone 14 Pro": [
            {
                  "name": "Space Black",
                  "hex": "#2a2a2a"
            },
            {
                  "name": "Silver",
                  "hex": "#f1f2ed"
            },
            {
                  "name": "Gold",
                  "hex": "#e2c7a1"
            },
            {
                  "name": "Deep Purple",
                  "hex": "#584f63"
            }
      ],
      "iPhone 14 Pro Max": [
            {
                  "name": "Space Black",
                  "hex": "#2a2a2a"
            },
            {
                  "name": "Silver",
                  "hex": "#f1f2ed"
            },
            {
                  "name": "Gold",
                  "hex": "#e2c7a1"
            },
            {
                  "name": "Deep Purple",
                  "hex": "#584f63"
            }
      ],
      "iPhone 13": [
            {
                  "name": "Midnight",
                  "hex": "#2e3138"
            },
            {
                  "name": "Starlight",
                  "hex": "#faf6ef"
            },
            {
                  "name": "Blue",
                  "hex": "#c4d7f2"
            },
            {
                  "name": "Pink",
                  "hex": "#f5d7de"
            },
            {
                  "name": "Green",
                  "hex": "#5f6d55"
            },
            {
                  "name": "Red",
                  "hex": "#c9192b"
            }
      ],
      "iPhone 13 mini": [
            {
                  "name": "Midnight",
                  "hex": "#2e3138"
            },
            {
                  "name": "Starlight",
                  "hex": "#faf6ef"
            },
            {
                  "name": "Blue",
                  "hex": "#c4d7f2"
            },
            {
                  "name": "Pink",
                  "hex": "#f5d7de"
            },
            {
                  "name": "Green",
                  "hex": "#5f6d55"
            },
            {
                  "name": "Red",
                  "hex": "#c9192b"
            }
      ],
      "iPhone 13 Pro": [
            {
                  "name": "Graphite",
                  "hex": "#4b4b4d"
            },
            {
                  "name": "Silver",
                  "hex": "#f0f1ec"
            },
            {
                  "name": "Gold",
                  "hex": "#f0d9bc"
            },
            {
                  "name": "Sierra Blue",
                  "hex": "#c9d8e7"
            },
            {
                  "name": "Alpine Green",
                  "hex": "#576856"
            }
      ],
      "iPhone 13 Pro Max": [
            {
                  "name": "Graphite",
                  "hex": "#4b4b4d"
            },
            {
                  "name": "Silver",
                  "hex": "#f0f1ec"
            },
            {
                  "name": "Gold",
                  "hex": "#f0d9bc"
            },
            {
                  "name": "Sierra Blue",
                  "hex": "#c9d8e7"
            },
            {
                  "name": "Alpine Green",
                  "hex": "#576856"
            }
      ],
      "iPhone 12": [
            {
                  "name": "Black",
                  "hex": "#2b2b2b"
            },
            {
                  "name": "White",
                  "hex": "#f5f2ed"
            },
            {
                  "name": "Blue",
                  "hex": "#0047a0"
            },
            {
                  "name": "Green",
                  "hex": "#b7dfd1"
            },
            {
                  "name": "Purple",
                  "hex": "#b5a8f0"
            },
            {
                  "name": "Red",
                  "hex": "#d81e3a"
            }
      ],
      "iPhone 12 mini": [
            {
                  "name": "Black",
                  "hex": "#2b2b2b"
            },
            {
                  "name": "White",
                  "hex": "#f5f2ed"
            },
            {
                  "name": "Blue",
                  "hex": "#0047a0"
            },
            {
                  "name": "Green",
                  "hex": "#b7dfd1"
            },
            {
                  "name": "Purple",
                  "hex": "#b5a8f0"
            },
            {
                  "name": "Red",
                  "hex": "#d81e3a"
            }
      ],
      "iPhone 12 Pro": [
            {
                  "name": "Graphite",
                  "hex": "#535150"
            },
            {
                  "name": "Silver",
                  "hex": "#f0f0eb"
            },
            {
                  "name": "Gold",
                  "hex": "#e2c7a5"
            },
            {
                  "name": "Pacific Blue",
                  "hex": "#496b74"
            }
      ],
      "iPhone 12 Pro Max": [
            {
                  "name": "Graphite",
                  "hex": "#535150"
            },
            {
                  "name": "Silver",
                  "hex": "#f0f0eb"
            },
            {
                  "name": "Gold",
                  "hex": "#e2c7a5"
            },
            {
                  "name": "Pacific Blue",
                  "hex": "#496b74"
            }
      ],
      "iPhone 11": [
            {
                  "name": "Black",
                  "hex": "#2c2c2e"
            },
            {
                  "name": "White",
                  "hex": "#f5f5f7"
            },
            {
                  "name": "Green",
                  "hex": "#d9f0df"
            },
            {
                  "name": "Yellow",
                  "hex": "#f4e25d"
            },
            {
                  "name": "Purple",
                  "hex": "#d9cdeb"
            },
            {
                  "name": "Red",
                  "hex": "#d32034"
            }
      ],
      "iPhone 11 Pro": [
            {
                  "name": "Space Gray",
                  "hex": "#51504d"
            },
            {
                  "name": "Silver",
                  "hex": "#f1f2ed"
            },
            {
                  "name": "Gold",
                  "hex": "#e9d6bf"
            },
            {
                  "name": "Midnight Green",
                  "hex": "#566257"
            }
      ],
      "iPhone 11 Pro Max": [
            {
                  "name": "Space Gray",
                  "hex": "#51504d"
            },
            {
                  "name": "Silver",
                  "hex": "#f1f2ed"
            },
            {
                  "name": "Gold",
                  "hex": "#e9d6bf"
            },
            {
                  "name": "Midnight Green",
                  "hex": "#566257"
            }
      ],
      "iPhone XR": [
            {
                  "name": "Black",
                  "hex": "#1b1b1d"
            },
            {
                  "name": "White",
                  "hex": "#f5f5f7"
            },
            {
                  "name": "Blue",
                  "hex": "#6f88bd"
            },
            {
                  "name": "Yellow",
                  "hex": "#f4d24d"
            },
            {
                  "name": "Coral",
                  "hex": "#f48d76"
            },
            {
                  "name": "Red",
                  "hex": "#d72837"
            }
      ],
      "iPhone X": [
            {
                  "name": "Space Gray",
                  "hex": "#4a4b4d"
            },
            {
                  "name": "Silver",
                  "hex": "#f1f1f0"
            }
      ],
      "iPhone XS": [
            {
                  "name": "Space Gray",
                  "hex": "#4a4b4d"
            },
            {
                  "name": "Silver",
                  "hex": "#f1f1f0"
            },
            {
                  "name": "Gold",
                  "hex": "#e3c8a8"
            }
      ],
      "iPhone XS Max": [
            {
                  "name": "Space Gray",
                  "hex": "#4a4b4d"
            },
            {
                  "name": "Silver",
                  "hex": "#f1f1f0"
            },
            {
                  "name": "Gold",
                  "hex": "#e3c8a8"
            }
      ],
      "iPhone SE (3rd generation)": [
            {
                  "name": "Midnight",
                  "hex": "#2f3136"
            },
            {
                  "name": "Starlight",
                  "hex": "#f3efe7"
            },
            {
                  "name": "Red",
                  "hex": "#d61f3b"
            }
      ],
      "iPhone SE (2nd generation)": [
            {
                  "name": "Black",
                  "hex": "#1d1d1f"
            },
            {
                  "name": "White",
                  "hex": "#f5f5f7"
            },
            {
                  "name": "Red",
                  "hex": "#d61f3b"
            }
      ],
      "iPhone 8": [
            {
                  "name": "Space Gray",
                  "hex": "#4a4c50"
            },
            {
                  "name": "Silver",
                  "hex": "#f0f1ec"
            },
            {
                  "name": "Gold",
                  "hex": "#f1d2bb"
            },
            {
                  "name": "Red",
                  "hex": "#c11f2f"
            }
      ],
      "iPhone 8 Plus": [
            {
                  "name": "Space Gray",
                  "hex": "#4a4c50"
            },
            {
                  "name": "Silver",
                  "hex": "#f0f1ec"
            },
            {
                  "name": "Gold",
                  "hex": "#f1d2bb"
            },
            {
                  "name": "Red",
                  "hex": "#c11f2f"
            }
      ],
      "iPhone 7": [
            {
                  "name": "Black",
                  "hex": "#26272c"
            },
            {
                  "name": "Jet Black",
                  "hex": "#111113"
            },
            {
                  "name": "Silver",
                  "hex": "#f0f1ec"
            },
            {
                  "name": "Gold",
                  "hex": "#ecd3b4"
            },
            {
                  "name": "Rose Gold",
                  "hex": "#eed0ca"
            },
            {
                  "name": "Red",
                  "hex": "#c5142d"
            }
      ],
      "iPhone 7 Plus": [
            {
                  "name": "Black",
                  "hex": "#26272c"
            },
            {
                  "name": "Jet Black",
                  "hex": "#111113"
            },
            {
                  "name": "Silver",
                  "hex": "#f0f1ec"
            },
            {
                  "name": "Gold",
                  "hex": "#ecd3b4"
            },
            {
                  "name": "Rose Gold",
                  "hex": "#eed0ca"
            },
            {
                  "name": "Red",
                  "hex": "#c5142d"
            }
      ],
      "iPhone 6": [
            {
                  "name": "Space Gray",
                  "hex": "#5b5960"
            },
            {
                  "name": "Silver",
                  "hex": "#f0f1ec"
            },
            {
                  "name": "Gold",
                  "hex": "#ead2b7"
            }
      ],
      "iPhone 6 Plus": [
            {
                  "name": "Space Gray",
                  "hex": "#5b5960"
            },
            {
                  "name": "Silver",
                  "hex": "#f0f1ec"
            },
            {
                  "name": "Gold",
                  "hex": "#ead2b7"
            }
      ],
      "iPhone 6s": [
            {
                  "name": "Space Gray",
                  "hex": "#5b5960"
            },
            {
                  "name": "Silver",
                  "hex": "#f0f1ec"
            },
            {
                  "name": "Gold",
                  "hex": "#ead2b7"
            },
            {
                  "name": "Rose Gold",
                  "hex": "#f1d2cc"
            }
      ],
      "iPhone 6s Plus": [
            {
                  "name": "Space Gray",
                  "hex": "#5b5960"
            },
            {
                  "name": "Silver",
                  "hex": "#f0f1ec"
            },
            {
                  "name": "Gold",
                  "hex": "#ead2b7"
            },
            {
                  "name": "Rose Gold",
                  "hex": "#f1d2cc"
            }
      ],
      "iPhone SE (1st generation)": [
            {
                  "name": "Space Gray",
                  "hex": "#5b5960"
            },
            {
                  "name": "Silver",
                  "hex": "#f0f1ec"
            },
            {
                  "name": "Gold",
                  "hex": "#ead2b7"
            },
            {
                  "name": "Rose Gold",
                  "hex": "#f1d2cc"
            }
      ],
      "iPhone 5": [
            {
                  "name": "Black",
                  "hex": "#1c1c1e"
            },
            {
                  "name": "White",
                  "hex": "#f3f3f1"
            }
      ],
      "iPhone 5c": [
            {
                  "name": "Blue",
                  "hex": "#58a6d8"
            },
            {
                  "name": "Green",
                  "hex": "#8fce68"
            },
            {
                  "name": "Pink",
                  "hex": "#f4aac2"
            },
            {
                  "name": "White",
                  "hex": "#f5f5f7"
            },
            {
                  "name": "Yellow",
                  "hex": "#f0dd5a"
            }
      ],
      "iPhone 5s": [
            {
                  "name": "Space Gray",
                  "hex": "#5b5960"
            },
            {
                  "name": "Silver",
                  "hex": "#f0f1ec"
            },
            {
                  "name": "Gold",
                  "hex": "#ead2b7"
            }
      ]
};

    const MODEL_NAME_ALIASES = {
      "iphone11": "iPhone 11",
      "iphone11pro": "iPhone 11 Pro",
      "iphone11promax": "iPhone 11 Pro Max",
      "iphone12": "iPhone 12",
      "iphone12pro": "iPhone 12 Pro",
      "iphone12promax": "iPhone 12 Pro Max",
      "iphone12mini": "iPhone 12 mini",
      "iphone13": "iPhone 13",
      "iphone13pro": "iPhone 13 Pro",
      "iphone13promax": "iPhone 13 Pro Max",
      "iphone13mini": "iPhone 13 mini",
      "iphone14": "iPhone 14",
      "iphone14plus": "iPhone 14 Plus",
      "iphone14pro": "iPhone 14 Pro",
      "iphone14promax": "iPhone 14 Pro Max",
      "iphone15": "iPhone 15",
      "iphone15plus": "iPhone 15 Plus",
      "iphone15pro": "iPhone 15 Pro",
      "iphone15promax": "iPhone 15 Pro Max",
      "iphone16": "iPhone 16",
      "iphone16plus": "iPhone 16 Plus",
      "iphone16pro": "iPhone 16 Pro",
      "iphone16promax": "iPhone 16 Pro Max",
      "iphone16e": "iPhone 16e",
      "iphone17": "iPhone 17",
      "iphone17pro": "iPhone 17 Pro",
      "iphone17promax": "iPhone 17 Pro Max",
      "iphone17e": "iPhone 17e",
      "iphone5": "iPhone 5",
      "iphone5c": "iPhone 5c",
      "iphone5s": "iPhone 5s",
      "iphone6": "iPhone 6",
      "iphone6plus": "iPhone 6 Plus",
      "iphone6s": "iPhone 6s",
      "iphone6splus": "iPhone 6s Plus",
      "iphone7": "iPhone 7",
      "iphone7plus": "iPhone 7 Plus",
      "iphone8": "iPhone 8",
      "iphone8plus": "iPhone 8 Plus",
      "iphoneair": "iPhone Air",
      "iphonese1stgeneration": "iPhone SE (1st generation)",
      "iphonese2ndgeneration": "iPhone SE (2nd generation)",
      "iphonese3rdgeneration": "iPhone SE (3rd generation)",
      "iphonex": "iPhone X",
      "iphonexr": "iPhone XR",
      "iphonexs": "iPhone XS",
      "iphonexsmax": "iPhone XS Max",
      "iphonese3": "iPhone SE (3rd generation)",
      "iphonese2": "iPhone SE (2nd generation)",
      "iphonese1": "iPhone SE (1st generation)",
      "iphonese": "iPhone SE (3rd generation)"
};

    const STRINGS = {
      de: {
        brandTitle: "iPhone Modell-Finder",
        brandSubtitle: "Exakt per A-Nummer. Visuell nur als Fallback.",
        hintsTitle: "Bildhinweise",
        hintsSubtitle: "Die Beispielbilder zeigen dir, worauf du am iPhone achten musst.",
        photoConfigNote: "Nutze die Fotos als Orientierung. Bei Unsicherheit ist die A-Nummer der sichere Weg.",
        chipStart: "Start",
        pathFast: "Schnellster Weg: A-Nummer",
        pathVisual: "Visueller Fallback",
        eyebrowStart: "Mini-App für Website oder iframe",
        startTitle: "Finde das iPhone-Modell so genau wie möglich",
        startSubtitle: "Für 99,9 % Genauigkeit zuerst immer die A-Nummer suchen. Die visuelle Erkennung ist nur der Fallback, wenn keine Modellnummer lesbar ist.",
        startPath1Title: "Exakt über Einstellungen",
        startPath1Text: "Für entsperrte Geräte. Am besten und am schnellsten.",
        startPath2Title: "Exakt direkt am Gerät",
        startPath2Text: "Für SIM-Fach, Rückseite oder im Anschluss mit Licht und Lupe.",
        startPath3Title: "Nur visuell bestimmen",
        startPath3Text: "Nur als Fallback. Bei getauschten Gehäusen nicht 100 % sicher.",
        startTipTitle: "Wichtig vor dem Start",
        startTip1: "Exakte Treffer gibt es nur mit A-Nummer.",
        startTip2: "Visuelle Treffer werden bewusst als wahrscheinlich oder als Modellfamilie ausgegeben.",
        startTip3: "Bei nicht originaler Außenmontage immer A-Nummer zur Bestätigung nachreichen.",
        settingsTitle: "Exakt über die A-Nummer in den Einstellungen",
        settingsSubtitle: "Auf dem iPhone: Einstellungen → Allgemein → Info → auf die Teilenummer tippen, bis A#### angezeigt wird.",
        settingsStep1: "Einstellungen öffnen.",
        settingsStep2: "Allgemein wählen.",
        settingsStep3: "Info öffnen.",
        settingsStep4: "Auf die Teilenummer tippen, bis die Modellnummer im Format A#### erscheint.",
        settingsInputLabel: "A-Nummer eingeben",
        settingsInputPlaceholder: "z. B. A3296",
        lookupButton: "Modell exakt finden",
        lookupHint: "Akzeptiert nur A-Nummern wie A3296, A2846, A2650.",
        noNumberFound: "Nicht gefunden. Prüfe bitte, ob die Nummer wirklich mit A beginnt und vier Ziffern hat.",
        deviceTitle: "Exakt direkt am Gerät suchen",
        deviceSubtitle: "Wenn das Gerät gesperrt ist, suche die Modellnummer direkt am iPhone und gib sie hier ein.",
        deviceCard1Title: "Im SIM-Fach prüfen",
        deviceCard1Text: "Bei iPhone 8 oder neuer mit SIM-Fach steht die Modellnummer oben im Slot auf der Display-Seite.",
        deviceCard2Title: "Im Anschluss prüfen",
        deviceCard2Text: "Bei iPhones ohne SIM-Fach im USB-C- oder Lightning-Anschluss prüfen. Helles Licht und Lupe verwenden.",
        deviceCard3Title: "Auf der Rückseite prüfen",
        deviceCard3Text: "Bei iPhone 7 oder älter steht die Modellnummer oft direkt auf der Rückseite.",
        officialGuideTitle: "Modellnummer des iPhone ermitteln",
        officialGuideIntro: "Nutze zuerst diese Wege. Das ist genauer als jede visuelle Erkennung.",
        guideSettingsTitle: "Einstellungen",
        guideSettingsText: "Einstellungen → Allgemein → Info. Rechts neben Modellnummer steht zuerst die Teilenummer. Tippe darauf, bis A#### erscheint.",
        guideBackTitle: "Rückseite",
        guideBackText: "Bei iPhone 7 oder älter steht die Modellnummer oft direkt auf der Rückseite des Geräts.",
        guideSimTitle: "SIM-Fach",
        guideSimText: "Bei iPhone 8 oder neuer mit SIM-Fach: SIM-Fach entfernen und oben im Slot auf der Display-Seite nachsehen.",
        guidePortTitle: "Anschluss",
        guidePortText: "Bei iPhones ohne SIM-Fach im USB-C- oder Lightning-Anschluss nachsehen. Helles Licht und am besten Lupe verwenden.",
        hint_old_back_cover_lookup_title: "Rückseite älterer iPhones",
        hint_old_back_cover_lookup_sub: "Beispiel: Modellnummer direkt auf der Rückseite",
        visualIntroTitle: "Visuelle Erkennung nur mit sauberer Warnung",
        visualIntroSubtitle: "Die visuelle Erkennung ist nur dann zuverlässig, wenn das Gerät außen weitgehend original ist.",
        visualWarnTitle: "Haftungssicherer Hinweis",
        visualWarnText: "Wenn Gehäuse, Rückglas, Kamerablock, Rahmen oder andere äußere Teile ersetzt wurden, kann die Optik vom Originalmodell abweichen. Dann ist eine visuelle Erkennung nicht mehr sicher genug.",
        visualContinue: "Trotzdem visuell fortsetzen",
        exactResultTitle: "Exakter Treffer",
        exactResultText: "Die eingegebene A-Nummer passt eindeutig zu diesem Modell.",
        exactReasonTitle: "Warum das exakt ist",
        exactReason1: "A-Nummer erkannt und direkt gemappt.",
        exactReason2: "Kein visuelles Raten nötig.",
        exactReason3: "Geeignet für Preislisten, Ersatzteilwahl und Terminbuchung.",
        visualResultTitle: "Visuelles Ergebnis",
        likelyLabel: "Sehr wahrscheinlich",
        familyLabel: "Bestätigung nötig",
        exactLabel: "Exakt",
        cautionExterior: "Du hast angegeben, dass die Außenmontage nicht original oder unklar ist. Deshalb wird das Ergebnis bewusst nicht als exakt markiert.",
        resultModelFamilyTitle: "Mögliche Modelle",
        resultWhyTitle: "So wurde gefiltert",
        resultNextTitle: "Nächster Schritt für 100 % Sicherheit",
        resultNextExact: "Suche jetzt die A-Nummer in den Einstellungen, im SIM-Fach oder im Anschluss und gib sie oben ein.",
        resultGoExact: "Zur exakten A-Nummer-Suche",
        resultRestart: "Neu starten",
        resultBack: "Zurück",
        answerSummaryTitle: "Deine Antworten",
        lookupAnother: "Andere A-Nummer prüfen",
        goVisual: "Zur visuellen Erkennung",
        goDevice: "Direkt am Gerät suchen",
        goSettings: "Über Einstellungen suchen",
        continueBtn: "Weiter",
        backBtn: "Zurück",
        startOverBtn: "Neu starten",
        hintAltPrefix: "Bildhinweis",
        summaryUnknown: "Keine sichere Zuordnung ohne A-Nummer.",
        originalWarningShort: "Nur originale Außenmontage ist visuell zuverlässig.",
        footerLine1: "Diese Mini-App ist absichtlich konservativ gebaut.",
        footerLine2: "Exakt = nur mit A-Nummer. Alles andere = wahrscheinlich oder Modellfamilie.",
        stepQuestion: "Frage",
        stepExact: "Exakt",
        stepVisual: "Visuell",
        chooseOne: "Bitte eine Option wählen.",
        inputHelpTitle: "Wo genau steht die Modellnummer?",
        inputHelp1: "In den Einstellungen nach Tippen auf die Teilenummer.",
        inputHelp2: "Im SIM-Fach bei vielen Modellen mit physischer SIM.",
        inputHelp3: "Im USB-C- oder Lightning-Anschluss bei Geräten ohne SIM-Fach.",
        resultsNoteExact: "Dieses Ergebnis kommt direkt aus der A-Nummer-Liste.",
        homeFamilyNote: "Home-Button-Modelle sind visuell oft zu ähnlich. Die App stoppt deshalb früher und fordert die A-Nummer an.",
        questionOriginalExterior: "Ist die äußere Bauform sehr wahrscheinlich original?",
        questionHomeButton: "Hat das iPhone einen Home Button auf der Vorderseite?",
        questionHomeSize: "Welche Größenklasse passt am ehesten?",
        questionPlasticBack: "Ist die Rückseite aus Kunststoff/Polycarbonat?",
        questionTouchId4: "Hat der Home Button Touch ID?",
        questionRoseGold4: "Ist die Farbe Roségold?",
        questionBackMaterial47: "4,7 Zoll mit Home Button: Rückseite aus Glas oder Metall?",
        questionHeadphone47: "Gibt es einen Kopfhöreranschluss 3,5 mm?",
        questionEngravedS47: "Steht auf der Rückseite ein eingraviertes S?",
        questionBackMaterial55: "5,5 Zoll mit Home Button: Rückseite aus Glas oder Metall?",
        questionHeadphone55: "Gibt es einen Kopfhöreranschluss 3,5 mm?",
        questionEngravedS55: "Steht auf der Rückseite ein eingraviertes S?",
        questionDynamicIsland: "Hat das iPhone vorne eine Dynamic Island?",
        questionDiCameraCount: "Wie viele Kameras hat es hinten?",
        questionPlateauOne: "Ist die einzelne Kamera auf einem breiten Plateau über fast die ganze Breite?",
        questionColorE: "Gibt es eine eindeutig erkennbare Farbe?",
        questionControlTwo: "Hat es rechts unten den Camera Control Knopf?",
        questionSize15: "Ist es Standardgröße oder großes Plus/Max-Gehäuse?",
        questionSizeTwoControl: "Welche Größenklasse trifft am ehesten zu?",
        questionColorTwoControl: "Welche Farbe trifft am ehesten zu?",
        questionControlThree: "Hat es rechts unten den Camera Control Knopf?",
        questionActionOldPro: "Hat es links oben einen Action Button statt Ring/Silent-Schalter?",
        questionSize14Pro: "Ist es Standardgröße oder Max-Größe?",
        questionSize15Pro: "Ist es Standardgröße oder Max-Größe?",
        questionPlateauPro: "Geht der Kamerabereich hinten als breites Plateau fast von Seite zu Seite?",
        questionSize16Pro: "Ist es Standardgröße oder Max-Größe?",
        questionSize17Pro: "Ist es Standardgröße oder Max-Größe?",
        questionNoDiCount: "Ohne Dynamic Island: Wie viele Kameras sind hinten?",
        questionNoDiTwoLayout: "Sind die zwei Kameras diagonal angeordnet?",
        questionNoDiTwoFlat: "Hat das Gerät flache Kanten statt runder Kanten?",
        questionSizeVerticalFlatTwo: "Welche Größenklasse trifft am ehesten zu?",
        questionSizeDiagonalTwo: "Welche Größenklasse trifft am ehesten zu?",
        questionColorDiagonal61: "Welche Farbe trifft am ehesten zu?",
        questionNoDiThreeFlat: "Hat das Gerät flache Kanten statt runder Kanten?",
        questionSize11Pro: "Ist es die kleinere oder größere Pro-Variante?",
        questionSizeFlatThree: "Ist es Standard-Pro oder Pro Max?",
        questionColorFlatThree61: "Welche Farbe trifft am ehesten zu?",
        questionColorFlatThree67: "Welche Farbe trifft am ehesten zu?",
        optYes: "Ja",
        optNo: "Nein",
        optNotSure: "Nicht sicher",
        optSize4: "Klein / ca. 4 Zoll",
        optSize47: "Standard mit Home Button / ca. 4,7 Zoll",
        optSize55: "Groß mit Home Button / ca. 5,5 Zoll",
        optGlass: "Glas",
        optMetal: "Metall/Aluminium",
        optPlastic: "Kunststoff",
        optOne: "1 Kamera",
        optTwo: "2 Kameras",
        optThree: "3 Kameras",
        optStandard: "Standard",
        optLarge: "Groß / Plus / Max",
        optStandard61: "Eher 6,1 Zoll / Standard",
        optStandard63: "Eher 6,3 Zoll / etwas größer",
        optLarge67: "Groß / 6,7 Zoll",
        optDiagonal: "Diagonal",
        optVertical: "Vertikal / nicht diagonal",
        optFlat: "Flache Kanten",
        optRounded: "Runde Kanten",
        optSmall: "Kleinere Variante",
        optBig: "Größere Variante",
        optSoftPink: "Soft Pink",
        optBlackWhite: "Schwarz oder Weiß / nicht eindeutig",
        optUnique13: "Pink oder Grün",
        optUnique14: "Lila oder Gelb",
        optUnique12Pro: "Pacific Blue",
        optUnique13Pro: "Sierra Blue oder Alpine Green",
        optUnique16: "Ultramarine, Teal oder Pink",
        optUnique17: "Mist Blue, Sage oder Lavender",
        optUnknownColor: "Schwarz/Weiß/Gold/Silber oder unklar",
        optHomeNoHint: "Nicht sicher",
        hint_settings_about_title: "Einstellungen → Allgemein → Info",
        hint_settings_about_sub: "Hier steht die A-Nummer nach einem Tipp auf die Teilenummer",
        hint_settings_model_tap_title: "Auf Teilenummer tippen",
        hint_settings_model_tap_sub: "Auf die angezeigte Teilenummer tippen, bis A#### erscheint",
        hint_sim_tray_lookup_title: "SIM-Fach prüfen",
        hint_sim_tray_lookup_sub: "Makro-Foto vom Slot mit markierter Position",
        hint_connector_lookup_title: "Im Anschluss prüfen",
        hint_connector_lookup_sub: "Makro-Foto mit Lupe / Licht",
        hint_back_cover_lookup_title: "Rückseite prüfen",
        hint_back_cover_lookup_sub: "Für iPhone 7 oder älter",
        hint_original_exterior_title: "Originale Außenmontage",
        hint_original_exterior_sub: "Achte auf ein möglicherweise getauschtes Gehäuse oder Kameramodul",
        hint_home_button_title: "Mit Home Button",
        hint_home_button_sub: "Frontansicht mit runder Taste unten",
        hint_no_home_button_title: "Ohne Home Button",
        hint_no_home_button_sub: "Frontansicht ohne Taste unten",
        hint_dynamic_island_title: "Dynamic Island",
        hint_dynamic_island_sub: "Oben pillenförmige Aussparung",
        hint_notch_title: "Notch / ohne Dynamic Island",
        hint_notch_sub: "Klassische Aussparung oder ältere Front",
        hint_camera_one_title: "1 Kamera",
        hint_camera_one_sub: "Rückseite mit einer einzelnen Linse",
        hint_camera_two_title: "2 Kameras",
        hint_camera_two_sub: "Rückseite mit zwei Linsen",
        hint_camera_three_title: "3 Kameras",
        hint_camera_three_sub: "Rückseite mit drei Linsen",
        hint_camera_diagonal_title: "Diagonal",
        hint_camera_diagonal_sub: "Zwei Linsen diagonal im Modul",
        hint_camera_vertical_title: "Vertikal",
        hint_camera_vertical_sub: "Zwei Linsen untereinander",
        hint_camera_control_title: "Camera Control",
        hint_camera_control_sub: "Extra Taste unten rechts",
        hint_no_camera_control_title: "Kein Camera Control",
        hint_no_camera_control_sub: "Nur Standard-Seitentasten",
        hint_action_button_title: "Action Button",
        hint_action_button_sub: "Links oben statt Mute-Schalter",
        hint_mute_switch_title: "Ring/Silent-Schalter",
        hint_mute_switch_sub: "Kleiner Schieber links oben",
        hint_plateau_extended_title: "Breites Plateau",
        hint_plateau_extended_sub: "Kamerabereich fast von Seite zu Seite",
        hint_standard_camera_bump_title: "Normales Kamera-Modul",
        hint_standard_camera_bump_sub: "Klassischer Eckblock",
        hint_glass_back_title: "Glasrückseite",
        hint_glass_back_sub: "Glänzend, meist für Wireless Charging",
        hint_aluminum_back_title: "Metallrückseite",
        hint_aluminum_back_sub: "Anodisiertes Aluminium",
        hint_plastic_back_title: "Kunststoffrückseite",
        hint_plastic_back_sub: "iPhone 5c Stil",
        hint_headphone_jack_title: "Mit 3,5-mm-Klinke",
        hint_headphone_jack_sub: "Unterkante mit Kopfhöreranschluss",
        hint_no_headphone_jack_title: "Ohne 3,5-mm-Klinke",
        hint_no_headphone_jack_sub: "Nur Lightning oder USB-C",
        hint_engraved_s_title: "Eingraviertes S",
        hint_engraved_s_sub: "Rückseite mit kleinem S unter dem iPhone-Schriftzug",
        hint_flat_edges_title: "Flache Kanten",
        hint_flat_edges_sub: "Rahmen wirkt gerade und kantig",
        hint_rounded_edges_title: "Runde Kanten",
        hint_rounded_edges_sub: "Rahmen wirkt stärker gerundet",
        hint_size_small_title: "Klein",
        hint_size_small_sub: "mini oder kleinere Standardgröße",
        hint_size_standard_title: "Standard",
        hint_size_standard_sub: "Normale Größe",
        hint_size_large_title: "Groß",
        hint_size_large_sub: "Plus, Max oder größeres Gehäuse",
        hint_soft_pink_title: "Soft Pink",
        hint_soft_pink_sub: "Einzige klare 17e-Farbe",
        hint_unique_13_title: "Pink oder Grün",
        hint_unique_13_sub: "Hilft bei iPhone 13 statt iPhone 14",
        hint_unique_14_title: "Lila oder Gelb",
        hint_unique_14_sub: "Hilft bei iPhone 14 statt iPhone 13",
        hint_unique_12pro_title: "Pacific Blue",
        hint_unique_12pro_sub: "Typisch für 12 Pro Linie",
        hint_unique_13pro_title: "Sierra Blue oder Alpine Green",
        hint_unique_13pro_sub: "Typisch für 13 Pro Linie",
        hint_unique_16_title: "Ultramarine / Teal / Pink",
        hint_unique_16_sub: "Hilft bei iPhone 16 Linie",
        hint_unique_17_title: "Mist Blue / Sage / Lavender",
        hint_unique_17_sub: "Hilft bei iPhone 17"
      },
      uk: {
        brandTitle: "Пошук моделі iPhone",
        brandSubtitle: "Точно по A-номеру. Візуально — лише як запасний шлях.",
        hintsTitle: "Фотопідказки",
        hintsSubtitle: "Приклади показують, на які ознаки iPhone потрібно звернути увагу.",
        photoConfigNote: "Фото допомагають зорієнтуватися. Для точного результату перевір A-номер.",
        chipStart: "Старт",
        pathFast: "Найточніше: A-номер",
        pathVisual: "Візуальний запасний шлях",
        eyebrowStart: "Міні-додаток для сайту або iframe",
        startTitle: "Знайди модель iPhone максимально точно",
        startSubtitle: "Для 99,9 % точності спочатку шукай A-номер. Візуальне визначення — лише запасний варіант, якщо номер моделі не читається.",
        startPath1Title: "Точно через налаштування",
        startPath1Text: "Для розблокованого телефону. Найкращий і найшвидший шлях.",
        startPath2Title: "Точно прямо на телефоні",
        startPath2Text: "Для SIM-лотка, задньої кришки або всередині роз’єму з ліхтариком і лупою.",
        startPath3Title: "Лише візуально",
        startPath3Text: "Тільки як запасний шлях. При заміненому корпусі не дає 100 %.",
        startTipTitle: "Важливо перед стартом",
        startTip1: "Точне визначення є тільки з A-номером.",
        startTip2: "Візуальні результати навмисно видаються як імовірні або як сімейство моделей.",
        startTip3: "При неоригінальній зовнішній збірці завжди потрібен A-номер для підтвердження.",
        settingsTitle: "Точний пошук через A-номер у налаштуваннях",
        settingsSubtitle: "На iPhone: Налаштування → Основні → Про пристрій → натисни на номер деталі, поки не з’явиться A####.",
        settingsStep1: "Відкрий Налаштування.",
        settingsStep2: "Вибери Основні.",
        settingsStep3: "Відкрий Про пристрій.",
        settingsStep4: "Натисни на номер деталі, поки не з’явиться модель у форматі A####.",
        settingsInputLabel: "Введи A-номер",
        settingsInputPlaceholder: "наприклад A3296",
        lookupButton: "Точно знайти модель",
        lookupHint: "Приймає тільки A-номери типу A3296, A2846, A2650.",
        noNumberFound: "Нічого не знайдено. Перевір, чи номер точно починається з A і містить чотири цифри.",
        deviceTitle: "Точний пошук прямо на телефоні",
        deviceSubtitle: "Якщо телефон заблокований, знайди модельний номер прямо на самому iPhone і введи його тут.",
        deviceCard1Title: "Перевірити SIM-лоток",
        deviceCard1Text: "На iPhone 8 або новіших з SIM-лотком модельний номер часто написаний зверху в слоті, зі сторони дисплея.",
        deviceCard2Title: "Перевірити роз’єм",
        deviceCard2Text: "На iPhone без SIM-лотка дивись всередині USB-C або Lightning. Використовуй яскраве світло та лупу.",
        deviceCard3Title: "Перевірити задню кришку",
        deviceCard3Text: "На iPhone 7 або старіших модельний номер часто є прямо ззаду.",
        visualIntroTitle: "Візуальне визначення тільки з чесним попередженням",
        visualIntroSubtitle: "Візуальне визначення надійне лише тоді, коли зовнішня збірка телефону дуже ймовірно оригінальна.",
        visualWarnTitle: "Важливе попередження",
        visualWarnText: "Якщо корпус, заднє скло, блок камер, рамка або інші зовнішні деталі вже міняли, зовнішність може не збігатися з оригінальною моделлю. У такому випадку візуального визначення вже недостатньо.",
        visualContinue: "Все одно продовжити візуально",
        exactResultTitle: "Точний збіг",
        exactResultText: "Введений A-номер однозначно відповідає цій моделі.",
        exactReasonTitle: "Чому це точно",
        exactReason1: "A-номер розпізнано та напряму зіставлено.",
        exactReason2: "Немає потреби візуально вгадувати.",
        exactReason3: "Підходить для вибору ціни, запчастин і запису на ремонт.",
        visualResultTitle: "Візуальний результат",
        likelyLabel: "Дуже ймовірно",
        familyLabel: "Потрібне підтвердження",
        exactLabel: "Точно",
        cautionExterior: "Ти вказав, що зовнішня збірка неоригінальна або сумнівна. Тому результат навмисно не позначається як точний.",
        resultModelFamilyTitle: "Можливі моделі",
        resultWhyTitle: "Як відбувалась фільтрація",
        resultNextTitle: "Що зробити далі для 100 % точності",
        resultNextExact: "Знайди A-номер у налаштуваннях, у SIM-лотку або в роз’ємі і введи його вище.",
        resultGoExact: "До точного пошуку по A-номеру",
        resultRestart: "Почати заново",
        resultBack: "Назад",
        answerSummaryTitle: "Твої відповіді",
        lookupAnother: "Перевірити інший A-номер",
        goVisual: "До візуального визначення",
        goDevice: "Шукати прямо на телефоні",
        goSettings: "Шукати через налаштування",
        continueBtn: "Далі",
        backBtn: "Назад",
        startOverBtn: "Почати заново",
        hintAltPrefix: "Фотопідказка",
        summaryUnknown: "Без A-номера немає безпечного точного визначення.",
        originalWarningShort: "Візуально надійно тільки для оригінальної зовнішньої збірки.",
        footerLine1: "Цей міні-додаток навмисно зроблений обережним.",
        footerLine2: "Точно = лише з A-номером. Все інше = ймовірно або сімейство моделей.",
        stepQuestion: "Питання",
        stepExact: "Точно",
        stepVisual: "Візуально",
        chooseOne: "Будь ласка, вибери один варіант.",
        inputHelpTitle: "Де саме шукати модельний номер?",
        inputHelp1: "У налаштуваннях після натискання на номер деталі.",
        inputHelp2: "У SIM-лотку на багатьох моделях з фізичною SIM.",
        inputHelp3: "У USB-C або Lightning роз’ємі на моделях без SIM-лотка.",
        resultsNoteExact: "Цей результат отримано напряму з A-номера.",
        homeFamilyNote: "Моделі з Home Button візуально часто занадто схожі. Тому додаток раніше зупиняється і просить A-номер.",
        questionOriginalExterior: "Зовнішня збірка дуже ймовірно оригінальна?",
        questionHomeButton: "На передній частині є кнопка Home?",
        questionHomeSize: "Який розмір найбільше підходить?",
        questionPlasticBack: "Задня кришка пластикова / полікарбонатна?",
        questionTouchId4: "Кнопка Home має Touch ID?",
        questionRoseGold4: "Колір — Rose Gold?",
        questionBackMaterial47: "4,7 дюйма з Home Button: задня кришка зі скла чи металу?",
        questionHeadphone47: "Є роз’єм 3,5 мм для навушників?",
        questionEngravedS47: "На задній кришці є вигравійована літера S?",
        questionBackMaterial55: "5,5 дюйма з Home Button: задня кришка зі скла чи металу?",
        questionHeadphone55: "Є роз’єм 3,5 мм для навушників?",
        questionEngravedS55: "На задній кришці є вигравійована літера S?",
        questionDynamicIsland: "Спереду є Dynamic Island?",
        questionDiCameraCount: "Скільки камер ззаду?",
        questionPlateauOne: "Одна камера стоїть на широкому плато майже на всю ширину?",
        questionColorE: "Є однозначно впізнаваний колір?",
        questionControlTwo: "Праворуч знизу є кнопка Camera Control?",
        questionSize15: "Це стандартний розмір чи великий Plus/Max?",
        questionSizeTwoControl: "Яка група розміру найбільше підходить?",
        questionColorTwoControl: "Який колір найбільше підходить?",
        questionControlThree: "Праворуч знизу є кнопка Camera Control?",
        questionActionOldPro: "Зліва зверху є Action Button замість перемикача беззвучного режиму?",
        questionSize14Pro: "Це стандартний розмір чи Max?",
        questionSize15Pro: "Це стандартний розмір чи Max?",
        questionPlateauPro: "Блок камер ззаду тягнеться широким плато майже від краю до краю?",
        questionSize16Pro: "Це стандартний розмір чи Max?",
        questionSize17Pro: "Це стандартний розмір чи Max?",
        questionNoDiCount: "Без Dynamic Island: скільки камер ззаду?",
        questionNoDiTwoLayout: "Дві камери стоять по діагоналі?",
        questionNoDiTwoFlat: "У телефона пласкі грані чи більш округлі?",
        questionSizeVerticalFlatTwo: "Яка група розміру найбільше підходить?",
        questionSizeDiagonalTwo: "Яка група розміру найбільше підходить?",
        questionColorDiagonal61: "Який колір найбільше підходить?",
        questionNoDiThreeFlat: "У телефона пласкі грані чи більш округлі?",
        questionSize11Pro: "Це менша чи більша Pro-версія?",
        questionSizeFlatThree: "Це звичайний Pro чи Pro Max?",
        questionColorFlatThree61: "Який колір найбільше підходить?",
        questionColorFlatThree67: "Який колір найбільше підходить?",
        optYes: "Так",
        optNo: "Ні",
        optNotSure: "Не впевнений",
        optSize4: "Малий / приблизно 4 дюйми",
        optSize47: "Стандартний з Home Button / приблизно 4,7 дюйма",
        optSize55: "Великий з Home Button / приблизно 5,5 дюйма",
        optGlass: "Скло",
        optMetal: "Метал / алюміній",
        optPlastic: "Пластик",
        optOne: "1 камера",
        optTwo: "2 камери",
        optThree: "3 камери",
        optStandard: "Стандартний",
        optLarge: "Великий / Plus / Max",
        optStandard61: "Скоріше 6,1 дюйма / стандарт",
        optStandard63: "Скоріше 6,3 дюйма / трохи більший",
        optLarge67: "Великий / 6,7 дюйма",
        optDiagonal: "По діагоналі",
        optVertical: "Вертикально / не по діагоналі",
        optFlat: "Пласкі грані",
        optRounded: "Більш округлі грані",
        optSmall: "Менша версія",
        optBig: "Більша версія",
        optSoftPink: "Soft Pink",
        optBlackWhite: "Чорний або білий / неочевидно",
        optUnique13: "Pink або Green",
        optUnique14: "Purple або Yellow",
        optUnique12Pro: "Pacific Blue",
        optUnique13Pro: "Sierra Blue або Alpine Green",
        optUnique16: "Ultramarine, Teal або Pink",
        optUnique17: "Mist Blue, Sage або Lavender",
        optUnknownColor: "Чорний/білий/золото/срібло або неясно",
        optHomeNoHint: "Не впевнений",
        hint_settings_about_title: "Налаштування → Основні → Про пристрій",
        hint_settings_about_sub: "Тут після натискання на номер деталі з’являється A-номер",
        hint_settings_model_tap_title: "Натисни на номер деталі",
        hint_settings_model_tap_sub: "Натискай на номер деталі, доки він не зміниться на A####",
        hint_sim_tray_lookup_title: "Перевірка SIM-лотка",
        hint_sim_tray_lookup_sub: "Шукай дрібний напис усередині слота з боку дисплея",
        hint_connector_lookup_title: "Перевірка в роз’ємі",
        hint_connector_lookup_sub: "Підсвіти роз’єм і скористайся лупою, щоб прочитати номер",
        hint_back_cover_lookup_title: "Перевірка на задній кришці",
        hint_back_cover_lookup_sub: "Для iPhone 7 або старіших",
        hint_original_exterior_title: "Оригінальна зовнішня збірка",
        hint_original_exterior_sub: "Зверни увагу, чи не замінювали корпус або блок камер",
        hint_home_button_title: "З Home Button",
        hint_home_button_sub: "Фронтальна частина з круглою кнопкою внизу",
        hint_no_home_button_title: "Без Home Button",
        hint_no_home_button_sub: "Фронтальна частина без кнопки внизу",
        hint_dynamic_island_title: "Dynamic Island",
        hint_dynamic_island_sub: "Зверху пігулкоподібний виріз",
        hint_notch_title: "Notch / без Dynamic Island",
        hint_notch_sub: "Класичний виріз або старіша передня частина",
        hint_camera_one_title: "1 камера",
        hint_camera_one_sub: "Задня частина з однією лінзою",
        hint_camera_two_title: "2 камери",
        hint_camera_two_sub: "Задня частина з двома лінзами",
        hint_camera_three_title: "3 камери",
        hint_camera_three_sub: "Задня частина з трьома лінзами",
        hint_camera_diagonal_title: "По діагоналі",
        hint_camera_diagonal_sub: "Дві лінзи навскіс у модулі",
        hint_camera_vertical_title: "Вертикально",
        hint_camera_vertical_sub: "Дві лінзи одна під одною",
        hint_camera_control_title: "Camera Control",
        hint_camera_control_sub: "Додаткова кнопка справа внизу",
        hint_no_camera_control_title: "Без Camera Control",
        hint_no_camera_control_sub: "Тільки стандартні кнопки збоку",
        hint_action_button_title: "Action Button",
        hint_action_button_sub: "Зліва зверху замість mute-перемикача",
        hint_mute_switch_title: "Перемикач беззвучного режиму",
        hint_mute_switch_sub: "Малий повзунок зліва зверху",
        hint_plateau_extended_title: "Широке плато",
        hint_plateau_extended_sub: "Камера стоїть на широкому модулі майже на всю ширину",
        hint_standard_camera_bump_title: "Звичайний блок камер",
        hint_standard_camera_bump_sub: "Класичний кутовий модуль",
        hint_glass_back_title: "Скляна задня кришка",
        hint_glass_back_sub: "Блискуча, часто для бездротової зарядки",
        hint_aluminum_back_title: "Металева задня кришка",
        hint_aluminum_back_sub: "Анодований алюміній",
        hint_plastic_back_title: "Пластикова задня кришка",
        hint_plastic_back_sub: "Стиль iPhone 5c",
        hint_headphone_jack_title: "Є 3,5-мм роз’єм",
        hint_headphone_jack_sub: "Нижня грань з аудіороз’ємом",
        hint_no_headphone_jack_title: "Немає 3,5-мм роз’єму",
        hint_no_headphone_jack_sub: "Тільки Lightning або USB-C",
        hint_engraved_s_title: "Вигравійована S",
        hint_engraved_s_sub: "Маленька S під написом iPhone",
        hint_flat_edges_title: "Пласкі грані",
        hint_flat_edges_sub: "Рамка виглядає прямою та кутовою",
        hint_rounded_edges_title: "Округлі грані",
        hint_rounded_edges_sub: "Рамка виглядає більш м’яко заокругленою",
        hint_size_small_title: "Малий",
        hint_size_small_sub: "mini або менший стандартний розмір",
        hint_size_standard_title: "Стандартний",
        hint_size_standard_sub: "Звичайний розмір",
        hint_size_large_title: "Великий",
        hint_size_large_sub: "Plus, Max або більший корпус",
        hint_soft_pink_title: "Soft Pink",
        hint_soft_pink_sub: "Єдиний чіткий колір 17e",
        hint_unique_13_title: "Pink або Green",
        hint_unique_13_sub: "Допомагає відрізнити iPhone 13 від iPhone 14",
        hint_unique_14_title: "Purple або Yellow",
        hint_unique_14_sub: "Допомагає відрізнити iPhone 14 від iPhone 13",
        hint_unique_12pro_title: "Pacific Blue",
        hint_unique_12pro_sub: "Типово для лінійки 12 Pro",
        hint_unique_13pro_title: "Sierra Blue або Alpine Green",
        hint_unique_13pro_sub: "Типово для лінійки 13 Pro",
        hint_unique_16_title: "Ultramarine / Teal / Pink",
        hint_unique_16_sub: "Допомагає для лінійки iPhone 16",
        hint_unique_17_title: "Mist Blue / Sage / Lavender",
        hint_unique_17_sub: "Допомагає для iPhone 17"
      },
      en: {
        brandTitle: "iPhone Model Finder",
        brandSubtitle: "Exact by A-number. Visual only as fallback.",
        hintsTitle: "Photo hints",
        hintsSubtitle: "The examples show which visible iPhone details to compare.",
        photoConfigNote: "Use the photos as a guide. Check the A-number for an exact result.",
        chipStart: "Start",
        pathFast: "Fastest way: A-number",
        pathVisual: "Visual fallback",
        eyebrowStart: "Mini app for website or iframe",
        startTitle: "Find the iPhone model as accurately as possible",
        startSubtitle: "For 99.9% accuracy always look for the A-number first. Visual identification is only the fallback if no model number can be read.",
        startPath1Title: "Exact through Settings",
        startPath1Text: "For unlocked phones. Best and fastest path.",
        startPath2Title: "Exact directly on the device",
        startPath2Text: "For SIM tray, back cover, or inside the port with light and magnifier.",
        startPath3Title: "Visual only",
        startPath3Text: "Fallback only. Not 100% safe after housing replacement.",
        startTipTitle: "Important before you start",
        startTip1: "Exact matches only come from the A-number.",
        startTip2: "Visual matches are intentionally shown as likely or as a model family.",
        startTip3: "If the exterior is not original, always confirm with the A-number.",
        settingsTitle: "Exact lookup by A-number in Settings",
        settingsSubtitle: "On the iPhone: Settings → General → About → tap the part number until A#### appears.",
        settingsStep1: "Open Settings.",
        settingsStep2: "Choose General.",
        settingsStep3: "Open About.",
        settingsStep4: "Tap the part number until the model number in A#### format appears.",
        settingsInputLabel: "Enter the A-number",
        settingsInputPlaceholder: "for example A3296",
        lookupButton: "Find model exactly",
        lookupHint: "Accepts only A-numbers like A3296, A2846, A2650.",
        noNumberFound: "Nothing found. Please check that the number really starts with A and has four digits.",
        deviceTitle: "Exact lookup directly on the phone",
        deviceSubtitle: "If the phone is locked, find the model number directly on the device and enter it here.",
        deviceCard1Title: "Check the SIM tray",
        deviceCard1Text: "On iPhone 8 or newer with a SIM tray, the model number is often printed at the top of the slot on the display side.",
        deviceCard2Title: "Check inside the port",
        deviceCard2Text: "On iPhones without a SIM tray, look inside the USB-C or Lightning port. Use bright light and a magnifier.",
        deviceCard3Title: "Check the back cover",
        deviceCard3Text: "On iPhone 7 or older, the model number is often printed on the back.",
        visualIntroTitle: "Visual identification only with a clear warning",
        visualIntroSubtitle: "Visual identification is only reliable when the exterior assembly is very likely original.",
        visualWarnTitle: "Important warning",
        visualWarnText: "If the housing, back glass, camera block, frame, or other exterior parts have been replaced, the look may no longer match the original model. In that case visual identification is no longer safe enough.",
        visualContinue: "Continue visually anyway",
        exactResultTitle: "Exact match",
        exactResultText: "The entered A-number matches this model uniquely.",
        exactReasonTitle: "Why this is exact",
        exactReason1: "A-number recognized and mapped directly.",
        exactReason2: "No visual guessing needed.",
        exactReason3: "Suitable for pricing, spare parts, and repair booking.",
        visualResultTitle: "Visual result",
        likelyLabel: "Very likely",
        familyLabel: "Confirmation needed",
        exactLabel: "Exact",
        cautionExterior: "You marked the exterior as replaced or unclear. Because of that the result is intentionally not shown as exact.",
        resultModelFamilyTitle: "Possible models",
        resultWhyTitle: "How the filtering worked",
        resultNextTitle: "Next step for 100% certainty",
        resultNextExact: "Now find the A-number in Settings, the SIM tray, or inside the port and enter it above.",
        resultGoExact: "Go to exact A-number lookup",
        resultRestart: "Start over",
        resultBack: "Back",
        answerSummaryTitle: "Your answers",
        lookupAnother: "Check another A-number",
        goVisual: "Go to visual identification",
        goDevice: "Search directly on the device",
        goSettings: "Search through Settings",
        continueBtn: "Continue",
        backBtn: "Back",
        startOverBtn: "Start over",
        hintAltPrefix: "Photo hint",
        summaryUnknown: "No safe exact match without the A-number.",
        originalWarningShort: "Visual matching is only reliable with an original exterior.",
        footerLine1: "This mini app is intentionally conservative.",
        footerLine2: "Exact = only with A-number. Everything else = likely or model family.",
        stepQuestion: "Question",
        stepExact: "Exact",
        stepVisual: "Visual",
        chooseOne: "Please choose one option.",
        inputHelpTitle: "Where exactly is the model number?",
        inputHelp1: "In Settings after tapping the part number.",
        inputHelp2: "In the SIM tray on many models with a physical SIM.",
        inputHelp3: "Inside the USB-C or Lightning port on models without a SIM tray.",
        resultsNoteExact: "This result comes directly from the A-number list.",
        homeFamilyNote: "Home button models are often too similar visually. That is why the app stops earlier and asks for the A-number.",
        questionOriginalExterior: "Is the exterior assembly very likely original?",
        questionHomeButton: "Does the phone have a Home button on the front?",
        questionHomeSize: "Which size class fits best?",
        questionPlasticBack: "Is the back plastic / polycarbonate?",
        questionTouchId4: "Does the Home button have Touch ID?",
        questionRoseGold4: "Is the color rose gold?",
        questionBackMaterial47: "4.7-inch with Home button: glass back or metal back?",
        questionHeadphone47: "Does it have a 3.5 mm headphone jack?",
        questionEngravedS47: "Is there an engraved S on the back?",
        questionBackMaterial55: "5.5-inch with Home button: glass back or metal back?",
        questionHeadphone55: "Does it have a 3.5 mm headphone jack?",
        questionEngravedS55: "Is there an engraved S on the back?",
        questionDynamicIsland: "Does the front have a Dynamic Island?",
        questionDiCameraCount: "How many rear cameras does it have?",
        questionPlateauOne: "Is the single camera sitting on a wide plateau almost across the full width?",
        questionColorE: "Is there a clearly recognizable color?",
        questionControlTwo: "Does it have the Camera Control button on the lower right side?",
        questionSize15: "Is it standard size or the larger Plus/Max body?",
        questionSizeTwoControl: "Which size class fits best?",
        questionColorTwoControl: "Which color fits best?",
        questionControlThree: "Does it have the Camera Control button on the lower right side?",
        questionActionOldPro: "Does it have an Action button instead of the Ring/Silent switch?",
        questionSize14Pro: "Is it standard size or Max size?",
        questionSize15Pro: "Is it standard size or Max size?",
        questionPlateauPro: "Does the rear camera area extend as a wide plateau almost from side to side?",
        questionSize16Pro: "Is it standard size or Max size?",
        questionSize17Pro: "Is it standard size or Max size?",
        questionNoDiCount: "Without Dynamic Island: how many rear cameras are there?",
        questionNoDiTwoLayout: "Are the two cameras arranged diagonally?",
        questionNoDiTwoFlat: "Does the phone have flat edges or more rounded edges?",
        questionSizeVerticalFlatTwo: "Which size class fits best?",
        questionSizeDiagonalTwo: "Which size class fits best?",
        questionColorDiagonal61: "Which color fits best?",
        questionNoDiThreeFlat: "Does the phone have flat edges or more rounded edges?",
        questionSize11Pro: "Is it the smaller or larger Pro variant?",
        questionSizeFlatThree: "Is it regular Pro or Pro Max?",
        questionColorFlatThree61: "Which color fits best?",
        questionColorFlatThree67: "Which color fits best?",
        optYes: "Yes",
        optNo: "No",
        optNotSure: "Not sure",
        optSize4: "Small / around 4 inches",
        optSize47: "Home-button standard / around 4.7 inches",
        optSize55: "Large with Home button / around 5.5 inches",
        optGlass: "Glass",
        optMetal: "Metal / aluminum",
        optPlastic: "Plastic",
        optOne: "1 camera",
        optTwo: "2 cameras",
        optThree: "3 cameras",
        optStandard: "Standard",
        optLarge: "Large / Plus / Max",
        optStandard61: "Closer to 6.1 inches / standard",
        optStandard63: "Closer to 6.3 inches / slightly larger",
        optLarge67: "Large / 6.7 inches",
        optDiagonal: "Diagonal",
        optVertical: "Vertical / not diagonal",
        optFlat: "Flat edges",
        optRounded: "Rounded edges",
        optSmall: "Smaller variant",
        optBig: "Larger variant",
        optSoftPink: "Soft Pink",
        optBlackWhite: "Black or white / not clear",
        optUnique13: "Pink or green",
        optUnique14: "Purple or yellow",
        optUnique12Pro: "Pacific Blue",
        optUnique13Pro: "Sierra Blue or Alpine Green",
        optUnique16: "Ultramarine, Teal or Pink",
        optUnique17: "Mist Blue, Sage or Lavender",
        optUnknownColor: "Black/white/gold/silver or unclear",
        optHomeNoHint: "Not sure",
        hint_settings_about_title: "Settings → General → About",
        hint_settings_about_sub: "Tap the part number here to reveal the A-number",
        hint_settings_model_tap_title: "Tap the part number",
        hint_settings_model_tap_sub: "Tap the displayed part number until it changes to A####",
        hint_sim_tray_lookup_title: "Check the SIM tray",
        hint_sim_tray_lookup_sub: "Look for the small print inside the slot on the display side",
        hint_connector_lookup_title: "Check inside the port",
        hint_connector_lookup_sub: "Use bright light and a magnifier to read the number inside",
        hint_back_cover_lookup_title: "Check the back cover",
        hint_back_cover_lookup_sub: "For iPhone 7 or older",
        hint_original_exterior_title: "Original exterior assembly",
        hint_original_exterior_sub: "Check whether the housing or camera module may have been replaced",
        hint_home_button_title: "With Home button",
        hint_home_button_sub: "Front view with the round button at the bottom",
        hint_no_home_button_title: "Without Home button",
        hint_no_home_button_sub: "Front view without the bottom button",
        hint_dynamic_island_title: "Dynamic Island",
        hint_dynamic_island_sub: "Pill-shaped top cutout",
        hint_notch_title: "Notch / no Dynamic Island",
        hint_notch_sub: "Classic cutout or older front",
        hint_camera_one_title: "1 camera",
        hint_camera_one_sub: "Back view with one lens",
        hint_camera_two_title: "2 cameras",
        hint_camera_two_sub: "Back view with two lenses",
        hint_camera_three_title: "3 cameras",
        hint_camera_three_sub: "Back view with three lenses",
        hint_camera_diagonal_title: "Diagonal",
        hint_camera_diagonal_sub: "Two lenses diagonally inside the module",
        hint_camera_vertical_title: "Vertical",
        hint_camera_vertical_sub: "Two lenses stacked top to bottom",
        hint_camera_control_title: "Camera Control",
        hint_camera_control_sub: "Extra button on the lower right side",
        hint_no_camera_control_title: "No Camera Control",
        hint_no_camera_control_sub: "Only the normal side buttons",
        hint_action_button_title: "Action button",
        hint_action_button_sub: "Upper left side instead of mute switch",
        hint_mute_switch_title: "Ring/Silent switch",
        hint_mute_switch_sub: "Small slider on the upper left side",
        hint_plateau_extended_title: "Wide plateau",
        hint_plateau_extended_sub: "Camera area stretches almost side to side",
        hint_standard_camera_bump_title: "Regular camera bump",
        hint_standard_camera_bump_sub: "Classic corner module",
        hint_glass_back_title: "Glass back",
        hint_glass_back_sub: "Glossy, often with wireless charging",
        hint_aluminum_back_title: "Metal back",
        hint_aluminum_back_sub: "Anodized aluminum",
        hint_plastic_back_title: "Plastic back",
        hint_plastic_back_sub: "iPhone 5c style",
        hint_headphone_jack_title: "With 3.5 mm jack",
        hint_headphone_jack_sub: "Bottom edge with headphone port",
        hint_no_headphone_jack_title: "No 3.5 mm jack",
        hint_no_headphone_jack_sub: "Only Lightning or USB-C",
        hint_engraved_s_title: "Engraved S",
        hint_engraved_s_sub: "Small S under the iPhone wordmark",
        hint_flat_edges_title: "Flat edges",
        hint_flat_edges_sub: "Frame looks straight and angular",
        hint_rounded_edges_title: "Rounded edges",
        hint_rounded_edges_sub: "Frame looks more curved",
        hint_size_small_title: "Small",
        hint_size_small_sub: "mini or smaller standard size",
        hint_size_standard_title: "Standard",
        hint_size_standard_sub: "Normal size",
        hint_size_large_title: "Large",
        hint_size_large_sub: "Plus, Max, or bigger body",
        hint_soft_pink_title: "Soft Pink",
        hint_soft_pink_sub: "Only clear 17e color",
        hint_unique_13_title: "Pink or green",
        hint_unique_13_sub: "Helps separate iPhone 13 from iPhone 14",
        hint_unique_14_title: "Purple or yellow",
        hint_unique_14_sub: "Helps separate iPhone 14 from iPhone 13",
        hint_unique_12pro_title: "Pacific Blue",
        hint_unique_12pro_sub: "Typical for the 12 Pro line",
        hint_unique_13pro_title: "Sierra Blue or Alpine Green",
        hint_unique_13pro_sub: "Typical for the 13 Pro line",
        hint_unique_16_title: "Ultramarine / Teal / Pink",
        hint_unique_16_sub: "Helpful for the iPhone 16 line",
        hint_unique_17_title: "Mist Blue / Sage / Lavender",
        hint_unique_17_sub: "Helpful for iPhone 17"
      }
    };


    Object.assign(STRINGS.de, {
      startPath4Title: "Box oder Rechnung prüfen",
      startPath4Text: "Wenn Name oder A-Nummer auf Verpackung oder Beleg steht.",
      goBox: "Zu Box / Rechnung",
      boxTitle: "Exakt über Box oder Rechnung",
      boxSubtitle: "Wenn auf der Originalverpackung, Rechnung oder dem Etikett schon ein Modellname oder eine A-Nummer steht, kannst du es hier direkt eingeben.",
      boxCard1Title: "Originalverpackung",
      boxCard1Text: "Suche nach dem Modellnamen wie iPhone 15 Pro Max oder nach einer A-Nummer auf dem Etikett.",
      boxCard2Title: "Rechnung / Kassenbon",
      boxCard2Text: "Oft steht dort der volle Modellname. Falls nur ein Code da ist, gib die A-Nummer ein.",
      boxCard3Title: "Lieferetikett",
      boxCard3Text: "Auf Händleretiketten stehen oft Marketingname, Kapazität oder die A-Nummer.",
      boxInputLabel: "Modellname oder A-Nummer eingeben",
      boxInputPlaceholder: "z. B. iPhone 16 Pro Max oder A3296",
      boxLookupHint: "Akzeptiert z. B. iPhone 15, iPhone SE (3rd generation) oder A3296.",
      resultColorTitle: "Farben zum Abgleich",
      resultColorSubtitle: "Diese Farben passen zu den aktuell verbleibenden Modellen.",
      exactResultByNameText: "Die Eingabe passt direkt zu einem bekannten Modellnamen.",
      exactReasonBox1: "Marketing-Name oder A-Nummer direkt erkannt.",
      exactReasonBox2: "Kein visueller Zwischenschritt nötig.",
      exactReasonBox3: "Ideal für Box, Rechnung oder Etikett."
    });
    Object.assign(STRINGS.uk, {
      startPath4Title: "Перевірити коробку або чек",
      startPath4Text: "Якщо на упаковці або в чеку вже є назва моделі чи A-номер.",
      goBox: "До коробки / чеку",
      boxTitle: "Точно через коробку або чек",
      boxSubtitle: "Якщо на оригінальній коробці, чеку або етикетці вже є назва моделі чи A-номер, введи це тут напряму.",
      boxCard1Title: "Оригінальна коробка",
      boxCard1Text: "Шукай назву моделі, наприклад iPhone 15 Pro Max, або A-номер на етикетці.",
      boxCard2Title: "Чек / рахунок",
      boxCard2Text: "Там часто є повна назва моделі. Якщо є лише код, введи A-номер.",
      boxCard3Title: "Етикетка продавця",
      boxCard3Text: "На етикетках магазинів часто є назва моделі, пам’ять або A-номер.",
      boxInputLabel: "Введи назву моделі або A-номер",
      boxInputPlaceholder: "наприклад iPhone 16 Pro Max або A3296",
      boxLookupHint: "Приймає, наприклад, iPhone 15, iPhone SE (3rd generation) або A3296.",
      resultColorTitle: "Кольори для звірки",
      resultColorSubtitle: "Ці кольори відповідають моделям, що ще залишилися.",
      exactResultByNameText: "Введене значення напряму збігається з відомою назвою моделі.",
      exactReasonBox1: "Назву моделі або A-номер розпізнано напряму.",
      exactReasonBox2: "Візуальна гілка не потрібна.",
      exactReasonBox3: "Найкраще для коробки, чеку або етикетки."
    });
    Object.assign(STRINGS.en, {
      startPath4Title: "Check box or receipt",
      startPath4Text: "If the model name or A-number is already on the packaging or invoice.",
      goBox: "Go to box / receipt",
      boxTitle: "Exact through box or receipt",
      boxSubtitle: "If the original box, invoice, or label already shows a model name or an A-number, enter it here directly.",
      boxCard1Title: "Original box",
      boxCard1Text: "Look for the model name like iPhone 15 Pro Max or an A-number on the label.",
      boxCard2Title: "Receipt / invoice",
      boxCard2Text: "It often shows the full model name. If it only shows a code, enter the A-number.",
      boxCard3Title: "Retail label",
      boxCard3Text: "Seller labels often include the marketing name, storage, or the A-number.",
      boxInputLabel: "Enter model name or A-number",
      boxInputPlaceholder: "for example iPhone 16 Pro Max or A3296",
      boxLookupHint: "Accepts examples like iPhone 15, iPhone SE (3rd generation), or A3296.",
      resultColorTitle: "Colors to compare",
      resultColorSubtitle: "These colors fit the models that are still in the result.",
      exactResultByNameText: "The entered value matches a known model name directly.",
      exactReasonBox1: "Marketing name or A-number recognized directly.",
      exactReasonBox2: "No visual fallback step needed.",
      exactReasonBox3: "Best for a box, receipt, or label."
    });


    Object.assign(STRINGS.de, {
      hint_box_receipt_title: "Box oder Rechnung",
      hint_box_receipt_sub: "Prüfe Verpackung, Rechnung oder Händlerbeleg",
      hint_retail_label_title: "Etikett / Modellname",
      hint_retail_label_sub: "Prüfe Modellname oder A-Nummer auf dem Label"
    });
    Object.assign(STRINGS.uk, {
      hint_box_receipt_title: "Коробка або чек",
      hint_box_receipt_sub: "Перевір упаковку, чек або документ продавця",
      hint_retail_label_title: "Етикетка / назва моделі",
      hint_retail_label_sub: "Перевір назву моделі або A-номер на етикетці"
    });
    Object.assign(STRINGS.en, {
      hint_box_receipt_title: "Box or receipt",
      hint_box_receipt_sub: "Check the packaging, invoice, or seller receipt",
      hint_retail_label_title: "Label / model name",
      hint_retail_label_sub: "Check the model name or A-number on the label"
    });


    Object.assign(STRINGS.de, {
      questionPortTwoNoControl: "Welchen Anschluss hat das iPhone? So trennt man iPhone 14 und iPhone 15 sicherer.",
      questionPortOldPro: "Welchen Anschluss hat das iPhone? So trennt man iPhone 14 Pro und iPhone 15 Pro sicherer.",
      optLightning: "Lightning",
      optUSBC: "USB-C",
      hint_lightning_port_title: "Lightning-Anschluss",
      hint_lightning_port_sub: "Schmaler Apple-Anschluss der älteren Modelle",
      hint_usb_c_port_title: "USB-C-Anschluss",
      hint_usb_c_port_sub: "Ovaler USB-C-Anschluss der neueren Modelle"
    });
    Object.assign(STRINGS.uk, {
      questionPortTwoNoControl: "Який тут роз’єм? Так легше відрізнити iPhone 14 від iPhone 15.",
      questionPortOldPro: "Який тут роз’єм? Так легше відрізнити iPhone 14 Pro від iPhone 15 Pro.",
      optLightning: "Lightning",
      optUSBC: "USB-C",
      hint_lightning_port_title: "Роз’єм Lightning",
      hint_lightning_port_sub: "Вузький роз’єм Apple у старіших моделях",
      hint_usb_c_port_title: "Роз’єм USB-C",
      hint_usb_c_port_sub: "Овальний роз’єм USB-C у новіших моделях"
    });
    Object.assign(STRINGS.en, {
      questionPortTwoNoControl: "Which connector does the iPhone have? This helps separate iPhone 14 from iPhone 15.",
      questionPortOldPro: "Which connector does the iPhone have? This helps separate iPhone 14 Pro from iPhone 15 Pro.",
      optLightning: "Lightning",
      optUSBC: "USB-C",
      hint_lightning_port_title: "Lightning port",
      hint_lightning_port_sub: "Slim Apple connector used on older models",
      hint_usb_c_port_title: "USB-C port",
      hint_usb_c_port_sub: "Oval USB-C connector used on newer models"
    });


    Object.assign(STRINGS.de, {
      questionConnectorType: "Welchen Ladeanschluss hat das iPhone?",
      questionUsbDynamicIsland: "Hat das iPhone vorne eine Dynamic Island?",
      questionLightningDynamicIsland: "Hat das iPhone vorne eine Dynamic Island?",
      questionUsbNoIslandCount: "USB-C ohne Dynamic Island: Wie viele Kameras sind hinten?",
      questionLightningIslandCount: "Lightning mit Dynamic Island: Wie viele Kameras sind hinten?",
      questionCameraModuleShape: "Wie sieht das Modul mit den zwei Kameras aus?",
      questionXFamilySize: "Ist es ungefähr 5,8 Zoll oder deutlich größer (6,5 Zoll)?",
      questionXFamilyColor: "Ist die Rückseite eindeutig Gold?",
      questionPortOneNoIsland: "Welchen Anschluss hat das iPhone mit einer Kamera und ohne Dynamic Island?",
      questionPortTwoNoIsland: "Welchen Anschluss hat das iPhone mit zwei Kameras und ohne Dynamic Island?",
      questionPortThreeNoIsland: "Welchen Anschluss hat das iPhone mit drei Kameras und ohne Dynamic Island?",
      questionOldSmallBack: "Wie sieht die Rückseite des sehr kleinen iPhone aus?",
      questionOldPlasticPrint: "Wie wirkt der Aufdruck auf der Kunststoff-Rückseite?",
      optSize35: "Sehr klein / ca. 3,5 Zoll",
      optCurvedPlastic: "Gebogene Kunststoff-Rückseite",
      optFlatGlass: "Flache Glas-Rückseite mit Metallrahmen",
      optAluminumBlack: "Aluminium-Rückseite mit schwarzem Unterteil",
      optShinyText: "Aufdruck glänzt ähnlich stark wie das Apple-Logo",
      optMatteText: "Aufdruck wirkt deutlich matter als das Apple-Logo",
      optPillModule: "Schmales, längliches Kamera-Modul",
      optSquareModule: "Quadratischer Kamera-Buckel",
      optSize58: "Ca. 5,8 Zoll / kompakt",
      optSize65: "Ca. 6,5 Zoll / groß",
      optGold: "Gold",
      optSilverGray: "Silber oder Space Grau",
      resultNoMatchTitle: "Keine sichere visuelle Übereinstimmung",
      resultNoMatchNote: "Die gewählten Merkmale passen zu keinem bekannten serienmäßigen iPhone. Prüfe den Ladeanschluss erneut, berücksichtige ein möglicherweise getauschtes Gehäuse und bestätige das Modell über die A-Nummer.",
      resultOldFamilyNote: "Bei diesen sehr alten Modellen ist die A-Nummer auf der Rückseite der zuverlässigste Weg.",
      resultXFamilyNote: "iPhone X und iPhone XS sind in Silber oder Space Grau äußerlich kaum sicher zu trennen. Gold gehört zum iPhone XS bzw. XS Max.",
      resultUnknownPortNote: "Ohne sichere Erkennung des Anschlusses bleibt die Auswahl bewusst breiter. Verwende ein Kabel als Vergleich: Lightning ist schmaler, USB-C ist oval und symmetrisch.",
      hint_old_plastic_back_title: "Gebogene Kunststoff-Rückseite",
      hint_old_plastic_back_sub: "Typisch für iPhone 3G und iPhone 3GS",
      hint_old_glass_back_title: "Flache Glas-Rückseite",
      hint_old_glass_back_sub: "Typisch für iPhone 4 und iPhone 4s",
      hint_old_aluminum_back_title: "Aluminium mit schwarzem Unterteil",
      hint_old_aluminum_back_sub: "Typisch für das erste iPhone",
      hint_shiny_text_title: "Glänzender Aufdruck",
      hint_shiny_text_sub: "Beim iPhone 3GS ähnlich glänzend wie das Apple-Logo",
      hint_matte_text_title: "Matter Aufdruck",
      hint_matte_text_sub: "Beim iPhone 3G weniger glänzend als das Apple-Logo",
      hint_pill_camera_title: "Schmales Kamera-Modul",
      hint_pill_camera_sub: "Vertikales Modul bei iPhone X / XS / XS Max",
      hint_square_camera_title: "Quadratischer Kamera-Buckel",
      hint_square_camera_sub: "Typisch ab iPhone 11",
      hint_gold_back_title: "Gold",
      hint_gold_back_sub: "Gold schließt iPhone X aus und spricht für XS / XS Max",
      hint_silver_gray_title: "Silber oder Space Grau",
      hint_silver_gray_sub: "Bei iPhone X und XS nicht sicher genug zur Trennung"
    });
    Object.assign(STRINGS.uk, {
      questionConnectorType: "Який роз’єм заряджання має iPhone?",
      questionUsbDynamicIsland: "Спереду є Dynamic Island?",
      questionLightningDynamicIsland: "Спереду є Dynamic Island?",
      questionUsbNoIslandCount: "USB-C без Dynamic Island: скільки камер ззаду?",
      questionLightningIslandCount: "Lightning з Dynamic Island: скільки камер ззаду?",
      questionCameraModuleShape: "Як виглядає модуль із двома камерами?",
      questionXFamilySize: "Це приблизно 5,8 дюйма чи помітно більший корпус 6,5 дюйма?",
      questionXFamilyColor: "Задня частина однозначно золота?",
      questionPortOneNoIsland: "Який роз’єм у iPhone з однією камерою та без Dynamic Island?",
      questionPortTwoNoIsland: "Який роз’єм у iPhone з двома камерами та без Dynamic Island?",
      questionPortThreeNoIsland: "Який роз’єм у iPhone з трьома камерами та без Dynamic Island?",
      questionOldSmallBack: "Як виглядає задня частина дуже малого iPhone?",
      questionOldPlasticPrint: "Як виглядає напис на пластиковій задній кришці?",
      optSize35: "Дуже малий / приблизно 3,5 дюйма",
      optCurvedPlastic: "Вигнута пластикова задня кришка",
      optFlatGlass: "Пласке скло з металевою рамкою",
      optAluminumBlack: "Алюміній із чорною нижньою вставкою",
      optShinyText: "Напис блищить приблизно як логотип Apple",
      optMatteText: "Напис помітно матовіший за логотип Apple",
      optPillModule: "Вузький подовжений модуль камер",
      optSquareModule: "Квадратний блок камер",
      optSize58: "Приблизно 5,8 дюйма / компактний",
      optSize65: "Приблизно 6,5 дюйма / великий",
      optGold: "Золотий",
      optSilverGray: "Срібний або Space Gray",
      resultNoMatchTitle: "Немає надійного візуального збігу",
      resultNoMatchNote: "Вибрані ознаки не відповідають жодному відомому серійному iPhone. Перевір роз’єм ще раз, врахуй можливу заміну корпусу та підтвердь модель через A-номер.",
      resultOldFamilyNote: "Для цих дуже старих моделей A-номер на задній частині є найнадійнішим способом.",
      resultXFamilyNote: "iPhone X та iPhone XS у срібному або Space Gray майже неможливо надійно розрізнити лише зовні. Золотий колір належить XS / XS Max.",
      resultUnknownPortNote: "Без точного визначення роз’єму список навмисно залишається ширшим. Порівняй кабель: Lightning вузький, USB-C овальний і симетричний.",
      hint_old_plastic_back_title: "Вигнута пластикова кришка",
      hint_old_plastic_back_sub: "Типово для iPhone 3G та iPhone 3GS",
      hint_old_glass_back_title: "Пласка скляна кришка",
      hint_old_glass_back_sub: "Типово для iPhone 4 та iPhone 4s",
      hint_old_aluminum_back_title: "Алюміній із чорною вставкою",
      hint_old_aluminum_back_sub: "Типово для першого iPhone",
      hint_shiny_text_title: "Блискучий напис",
      hint_shiny_text_sub: "На iPhone 3GS блищить подібно до логотипа Apple",
      hint_matte_text_title: "Матовий напис",
      hint_matte_text_sub: "На iPhone 3G менш блискучий за логотип Apple",
      hint_pill_camera_title: "Вузький модуль камер",
      hint_pill_camera_sub: "Вертикальний модуль iPhone X / XS / XS Max",
      hint_square_camera_title: "Квадратний блок камер",
      hint_square_camera_sub: "Типово починаючи з iPhone 11",
      hint_gold_back_title: "Золотий",
      hint_gold_back_sub: "Золотий виключає iPhone X і вказує на XS / XS Max",
      hint_silver_gray_title: "Срібний або Space Gray",
      hint_silver_gray_sub: "Недостатньо для надійного розділення X та XS"
    });
    Object.assign(STRINGS.en, {
      questionConnectorType: "Which charging connector does the iPhone have?",
      questionUsbDynamicIsland: "Does the front have a Dynamic Island?",
      questionLightningDynamicIsland: "Does the front have a Dynamic Island?",
      questionUsbNoIslandCount: "USB-C without Dynamic Island: how many rear cameras are there?",
      questionLightningIslandCount: "Lightning with Dynamic Island: how many rear cameras are there?",
      questionCameraModuleShape: "What shape is the two-camera module?",
      questionXFamilySize: "Is it around 5.8 inches or clearly larger at about 6.5 inches?",
      questionXFamilyColor: "Is the back clearly gold?",
      questionPortOneNoIsland: "Which connector is used on the one-camera iPhone without Dynamic Island?",
      questionPortTwoNoIsland: "Which connector is used on the two-camera iPhone without Dynamic Island?",
      questionPortThreeNoIsland: "Which connector is used on the three-camera iPhone without Dynamic Island?",
      questionOldSmallBack: "What does the back of the very small iPhone look like?",
      questionOldPlasticPrint: "How does the text on the plastic back look?",
      optSize35: "Very small / around 3.5 inches",
      optCurvedPlastic: "Curved plastic back",
      optFlatGlass: "Flat glass back with metal frame",
      optAluminumBlack: "Aluminum back with a black lower section",
      optShinyText: "Text shines about as much as the Apple logo",
      optMatteText: "Text looks clearly duller than the Apple logo",
      optPillModule: "Slim elongated camera module",
      optSquareModule: "Square camera bump",
      optSize58: "Around 5.8 inches / compact",
      optSize65: "Around 6.5 inches / large",
      optGold: "Gold",
      optSilverGray: "Silver or Space Gray",
      resultNoMatchTitle: "No reliable visual match",
      resultNoMatchNote: "The selected features do not match a known factory iPhone. Check the charging connector again, consider a replaced housing, and confirm the model with the A-number.",
      resultOldFamilyNote: "For these very old models, the A-number on the back is the most reliable method.",
      resultXFamilyNote: "iPhone X and iPhone XS in Silver or Space Gray are extremely difficult to separate reliably by appearance alone. Gold indicates XS / XS Max.",
      resultUnknownPortNote: "Without a reliable connector answer, the result intentionally stays broader. Compare a cable: Lightning is narrow, USB-C is oval and symmetrical.",
      hint_old_plastic_back_title: "Curved plastic back",
      hint_old_plastic_back_sub: "Typical of iPhone 3G and iPhone 3GS",
      hint_old_glass_back_title: "Flat glass back",
      hint_old_glass_back_sub: "Typical of iPhone 4 and iPhone 4s",
      hint_old_aluminum_back_title: "Aluminum with black lower section",
      hint_old_aluminum_back_sub: "Typical of the original iPhone",
      hint_shiny_text_title: "Shiny rear text",
      hint_shiny_text_sub: "On iPhone 3GS it shines similarly to the Apple logo",
      hint_matte_text_title: "Duller rear text",
      hint_matte_text_sub: "On iPhone 3G it is less shiny than the Apple logo",
      hint_pill_camera_title: "Slim camera module",
      hint_pill_camera_sub: "Vertical module on iPhone X / XS / XS Max",
      hint_square_camera_title: "Square camera bump",
      hint_square_camera_sub: "Typical from iPhone 11 onward",
      hint_gold_back_title: "Gold",
      hint_gold_back_sub: "Gold rules out iPhone X and points to XS / XS Max",
      hint_silver_gray_title: "Silver or Space Gray",
      hint_silver_gray_sub: "Not enough to reliably separate X and XS"
    });

    const QUESTION_NODES = {
      originalExterior: {
        titleKey: "questionOriginalExterior", hints: ["original_exterior"],
        options: [{value:"yes",labelKey:"optYes"},{value:"no",labelKey:"optNo"},{value:"not_sure",labelKey:"optNotSure"}],
        next: {yes:"homeButton",no:"homeButton",not_sure:"homeButton"}
      },
      homeButton: {
        titleKey: "questionHomeButton", hints: ["home_button","no_home_button"],
        options: [{value:"yes",labelKey:"optYes"},{value:"no",labelKey:"optNo"}],
        next: {yes:"homeSize",no:"connectorType"}
      },
      homeSize: {
        titleKey: "questionHomeSize", hints: ["size_small","size_standard","size_large"],
        options: [{value:"size35",labelKey:"optSize35"},{value:"size4",labelKey:"optSize4"},{value:"size47",labelKey:"optSize47"},{value:"size55",labelKey:"optSize55"},{value:"unknown",labelKey:"optHomeNoHint"}],
        next: {size35:"oldSmallBack",size4:"homePlastic",size47:"homeBackMaterial47",size55:"homeBackMaterial55",unknown:"result_home_family"}
      },
      oldSmallBack: {
        titleKey:"questionOldSmallBack", hints:["old_plastic_back","old_glass_back","old_aluminum_back"],
        options:[{value:"plastic",labelKey:"optCurvedPlastic"},{value:"glass",labelKey:"optFlatGlass"},{value:"aluminum",labelKey:"optAluminumBlack"},{value:"not_sure",labelKey:"optNotSure"}],
        next:{plastic:"oldPlasticPrint",glass:"result_family_4_4s",aluminum:"result_iphone_original",not_sure:"result_family_old_35"}
      },
      oldPlasticPrint: {
        titleKey:"questionOldPlasticPrint", hints:["shiny_text","matte_text"],
        options:[{value:"shiny",labelKey:"optShinyText"},{value:"matte",labelKey:"optMatteText"},{value:"not_sure",labelKey:"optNotSure"}],
        next:{shiny:"result_iphone3gs",matte:"result_iphone3g",not_sure:"result_family_3g_3gs"}
      },
      homePlastic: {
        titleKey:"questionPlasticBack", hints:["plastic_back","aluminum_back"],
        options:[{value:"yes",labelKey:"optYes"},{value:"no",labelKey:"optNo"},{value:"not_sure",labelKey:"optNotSure"}],
        next:{yes:"result_iphone5c",no:"homeTouchId4",not_sure:"homeTouchId4"}
      },
      homeTouchId4: {
        titleKey:"questionTouchId4", hints:["home_button","no_home_button"],
        options:[{value:"yes",labelKey:"optYes"},{value:"no",labelKey:"optNo"},{value:"not_sure",labelKey:"optNotSure"}],
        next:{yes:"homeRoseGold4",no:"result_iphone5",not_sure:"result_family_5s_se1"}
      },
      homeRoseGold4: {
        titleKey:"questionRoseGold4", hints:["rose_gold","not_rose_gold"],
        options:[{value:"yes",labelKey:"optYes"},{value:"no",labelKey:"optNo"},{value:"not_sure",labelKey:"optNotSure"}],
        next:{yes:"result_se1",no:"result_family_5s_se1",not_sure:"result_family_5s_se1"}
      },
      homeBackMaterial47: {
        titleKey:"questionBackMaterial47", hints:["glass_back","aluminum_back"],
        options:[{value:"glass",labelKey:"optGlass"},{value:"metal",labelKey:"optMetal"},{value:"not_sure",labelKey:"optNotSure"}],
        next:{glass:"result_family_8_se2_se3",metal:"homeHeadphone47",not_sure:"homeHeadphone47"}
      },
      homeHeadphone47: {
        titleKey:"questionHeadphone47", hints:["headphone_jack","no_headphone_jack"],
        options:[{value:"yes",labelKey:"optYes"},{value:"no",labelKey:"optNo"},{value:"not_sure",labelKey:"optNotSure"}],
        next:{yes:"homeEngravedS47",no:"result_iphone7",not_sure:"result_family_6_6s_7"}
      },
      homeEngravedS47: {
        titleKey:"questionEngravedS47", hints:["engraved_s"],
        options:[{value:"yes",labelKey:"optYes"},{value:"no",labelKey:"optNo"},{value:"not_sure",labelKey:"optNotSure"}],
        next:{yes:"result_iphone6s",no:"result_iphone6",not_sure:"result_family_6_6s"}
      },
      homeBackMaterial55: {
        titleKey:"questionBackMaterial55", hints:["glass_back","aluminum_back"],
        options:[{value:"glass",labelKey:"optGlass"},{value:"metal",labelKey:"optMetal"},{value:"not_sure",labelKey:"optNotSure"}],
        next:{glass:"result_iphone8plus",metal:"homeHeadphone55",not_sure:"homeHeadphone55"}
      },
      homeHeadphone55: {
        titleKey:"questionHeadphone55", hints:["headphone_jack","no_headphone_jack"],
        options:[{value:"yes",labelKey:"optYes"},{value:"no",labelKey:"optNo"},{value:"not_sure",labelKey:"optNotSure"}],
        next:{yes:"homeEngravedS55",no:"result_iphone7plus",not_sure:"result_family_6plus_6splus_7plus"}
      },
      homeEngravedS55: {
        titleKey:"questionEngravedS55", hints:["engraved_s"],
        options:[{value:"yes",labelKey:"optYes"},{value:"no",labelKey:"optNo"},{value:"not_sure",labelKey:"optNotSure"}],
        next:{yes:"result_iphone6splus",no:"result_iphone6plus",not_sure:"result_family_6plus_6splus"}
      },
      connectorType: {
        titleKey:"questionConnectorType", hints:["lightning_port","usb_c_port"],
        options:[{value:"lightning",labelKey:"optLightning"},{value:"usb_c",labelKey:"optUSBC"},{value:"not_sure",labelKey:"optNotSure"}],
        next:{lightning:"lightningDynamicIsland",usb_c:"usbDynamicIsland",not_sure:"dynamicIsland"}
      },
      usbDynamicIsland: {
        titleKey:"questionUsbDynamicIsland", hints:["dynamic_island","notch"],
        options:[{value:"yes",labelKey:"optYes"},{value:"no",labelKey:"optNo"}],
        next:{yes:"usbDiCameraCount",no:"usbNoIslandCount"}
      },
      usbNoIslandCount: {
        titleKey:"questionUsbNoIslandCount", hints:["camera_one","camera_two","camera_three"],
        options:[{value:"one",labelKey:"optOne"},{value:"two",labelKey:"optTwo"},{value:"three",labelKey:"optThree"}],
        next:{one:"colorE",two:"result_no_match",three:"result_no_match"}
      },
      usbDiCameraCount: {
        titleKey:"questionDiCameraCount", hints:["camera_one","camera_two","camera_three"],
        options:[{value:"one",labelKey:"optOne"},{value:"two",labelKey:"optTwo"},{value:"three",labelKey:"optThree"}],
        next:{one:"plateauOne",two:"usbControlTwo",three:"usbControlThree"}
      },
      plateauOne: {
        titleKey:"questionPlateauOne", hints:["plateau_extended","standard_camera_bump"],
        options:[{value:"yes",labelKey:"optYes"},{value:"no",labelKey:"optNo"},{value:"not_sure",labelKey:"optNotSure"}],
        next:{yes:"result_iphone_air",no:"result_no_match",not_sure:"result_iphone_air"}
      },
      colorE: {
        titleKey:"questionColorE", hints:["soft_pink"],
        options:[{value:"soft_pink",labelKey:"optSoftPink"},{value:"other",labelKey:"optBlackWhite"},{value:"not_sure",labelKey:"optNotSure"}],
        next:{soft_pink:"result_iphone17e",other:"result_family_16e_17e",not_sure:"result_family_16e_17e"}
      },
      usbControlTwo: {
        titleKey:"questionControlTwo", hints:["camera_control","no_camera_control"],
        options:[{value:"yes",labelKey:"optYes"},{value:"no",labelKey:"optNo"},{value:"not_sure",labelKey:"optNotSure"}],
        next:{yes:"sizeTwoControl",no:"size15",not_sure:"result_family_15_16_16plus_17"}
      },
      size15: {
        titleKey:"questionSize15", hints:["size_standard","size_large"],
        options:[{value:"standard",labelKey:"optStandard"},{value:"large",labelKey:"optLarge"},{value:"not_sure",labelKey:"optNotSure"}],
        next:{standard:"result_iphone15",large:"result_iphone15plus",not_sure:"result_family_15_15plus"}
      },
      sizeTwoControl: {
        titleKey:"questionSizeTwoControl", hints:["size_standard","unique_17","size_large"],
        options:[{value:"61",labelKey:"optStandard61"},{value:"63",labelKey:"optStandard63"},{value:"67",labelKey:"optLarge67"},{value:"not_sure",labelKey:"optNotSure"}],
        next:{61:"result_iphone16",63:"result_iphone17",67:"result_iphone16plus",not_sure:"colorTwoControl"}
      },
      colorTwoControl: {
        titleKey:"questionColorTwoControl", hints:["unique_16","unique_17"],
        options:[{value:"line16",labelKey:"optUnique16"},{value:"line17",labelKey:"optUnique17"},{value:"other",labelKey:"optBlackWhite"}],
        next:{line16:"result_family_16_16plus",line17:"result_iphone17",other:"result_family_16_16plus_17"}
      },
      usbControlThree: {
        titleKey:"questionControlThree", hints:["camera_control","no_camera_control"],
        options:[{value:"yes",labelKey:"optYes"},{value:"no",labelKey:"optNo"},{value:"not_sure",labelKey:"optNotSure"}],
        next:{yes:"plateauPro",no:"size15Pro",not_sure:"result_family_15_16_17_pro"}
      },
      plateauPro: {
        titleKey:"questionPlateauPro", hints:["plateau_extended","standard_camera_bump"],
        options:[{value:"yes",labelKey:"optYes"},{value:"no",labelKey:"optNo"},{value:"not_sure",labelKey:"optNotSure"}],
        next:{yes:"size17Pro",no:"size16Pro",not_sure:"result_family_16_17_pro"}
      },
      size15Pro: {titleKey:"questionSize15Pro",hints:["size_standard","size_large"],options:[{value:"standard",labelKey:"optStandard"},{value:"large",labelKey:"optLarge"},{value:"not_sure",labelKey:"optNotSure"}],next:{standard:"result_iphone15pro",large:"result_iphone15promax",not_sure:"result_family_15pro_15promax"}},
      size16Pro: {titleKey:"questionSize16Pro",hints:["size_standard","size_large"],options:[{value:"standard",labelKey:"optStandard"},{value:"large",labelKey:"optLarge"},{value:"not_sure",labelKey:"optNotSure"}],next:{standard:"result_iphone16pro",large:"result_iphone16promax",not_sure:"result_family_16pro_16promax"}},
      size17Pro: {titleKey:"questionSize17Pro",hints:["size_standard","size_large"],options:[{value:"standard",labelKey:"optStandard"},{value:"large",labelKey:"optLarge"},{value:"not_sure",labelKey:"optNotSure"}],next:{standard:"result_iphone17pro",large:"result_iphone17promax",not_sure:"result_family_17pro_17promax"}},
      lightningDynamicIsland: {
        titleKey:"questionLightningDynamicIsland", hints:["dynamic_island","notch"],
        options:[{value:"yes",labelKey:"optYes"},{value:"no",labelKey:"optNo"}],
        next:{yes:"lightningIslandCount",no:"lightningNoIslandCount"}
      },
      lightningIslandCount: {
        titleKey:"questionLightningIslandCount",hints:["camera_one","camera_two","camera_three"],
        options:[{value:"one",labelKey:"optOne"},{value:"two",labelKey:"optTwo"},{value:"three",labelKey:"optThree"}],
        next:{one:"result_no_match",two:"result_no_match",three:"size14Pro"}
      },
      size14Pro: {titleKey:"questionSize14Pro",hints:["size_standard","size_large"],options:[{value:"standard",labelKey:"optStandard"},{value:"large",labelKey:"optLarge"},{value:"not_sure",labelKey:"optNotSure"}],next:{standard:"result_iphone14pro",large:"result_iphone14promax",not_sure:"result_family_14pro_14promax"}},
      lightningNoIslandCount: {
        titleKey:"questionNoDiCount",hints:["camera_one","camera_two","camera_three"],
        options:[{value:"one",labelKey:"optOne"},{value:"two",labelKey:"optTwo"},{value:"three",labelKey:"optThree"}],
        next:{one:"result_iphonexr",two:"cameraModuleShape",three:"noDiThreeFlat"}
      },
      cameraModuleShape: {
        titleKey:"questionCameraModuleShape",hints:["pill_camera","square_camera"],
        options:[{value:"pill",labelKey:"optPillModule"},{value:"square",labelKey:"optSquareModule"},{value:"not_sure",labelKey:"optNotSure"}],
        next:{pill:"sizeXFamily",square:"noDiTwoLayout",not_sure:"result_family_x_xs_11_12_13_14"}
      },
      sizeXFamily: {
        titleKey:"questionXFamilySize",hints:["size_small","size_large"],
        options:[{value:"small58",labelKey:"optSize58"},{value:"large65",labelKey:"optSize65"},{value:"not_sure",labelKey:"optNotSure"}],
        next:{small58:"colorXFamily",large65:"result_iphonexsmax",not_sure:"result_family_x_xs_xsmax"}
      },
      colorXFamily: {
        titleKey:"questionXFamilyColor",hints:["gold_back","silver_gray"],
        options:[{value:"gold",labelKey:"optGold"},{value:"silver_gray",labelKey:"optSilverGray"},{value:"not_sure",labelKey:"optNotSure"}],
        next:{gold:"result_iphonexs",silver_gray:"result_family_x_xs",not_sure:"result_family_x_xs"}
      },
      noDiTwoLayout: {
        titleKey:"questionNoDiTwoLayout",hints:["camera_diagonal","camera_vertical"],
        options:[{value:"diagonal",labelKey:"optDiagonal"},{value:"vertical",labelKey:"optVertical"},{value:"not_sure",labelKey:"optNotSure"}],
        next:{diagonal:"sizeDiagonalTwo",vertical:"noDiTwoFlat",not_sure:"result_family_11_12_13_14"}
      },
      noDiTwoFlat: {
        titleKey:"questionNoDiTwoFlat",hints:["flat_edges","rounded_edges"],
        options:[{value:"flat",labelKey:"optFlat"},{value:"rounded",labelKey:"optRounded"},{value:"not_sure",labelKey:"optNotSure"}],
        next:{flat:"sizeVerticalFlatTwo",rounded:"result_iphone11",not_sure:"result_family_11_12_12mini"}
      },
      sizeVerticalFlatTwo: {titleKey:"questionSizeVerticalFlatTwo",hints:["size_small","size_standard"],options:[{value:"small",labelKey:"optSmall"},{value:"standard",labelKey:"optStandard"},{value:"not_sure",labelKey:"optNotSure"}],next:{small:"result_iphone12mini",standard:"result_iphone12",not_sure:"result_family_12_12mini"}},
      sizeDiagonalTwo: {titleKey:"questionSizeDiagonalTwo",hints:["size_small","size_standard","size_large"],options:[{value:"small",labelKey:"optSmall"},{value:"standard",labelKey:"optStandard"},{value:"large",labelKey:"optLarge"},{value:"not_sure",labelKey:"optNotSure"}],next:{small:"result_iphone13mini",standard:"colorDiagonal61",large:"result_iphone14plus",not_sure:"result_family_13_13mini_14_14plus"}},
      colorDiagonal61: {titleKey:"questionColorDiagonal61",hints:["unique_13","unique_14"],options:[{value:"line13",labelKey:"optUnique13"},{value:"line14",labelKey:"optUnique14"},{value:"other",labelKey:"optBlackWhite"}],next:{line13:"result_iphone13",line14:"result_iphone14",other:"result_family_13_14"}},
      noDiThreeFlat: {titleKey:"questionNoDiThreeFlat",hints:["flat_edges","rounded_edges"],options:[{value:"flat",labelKey:"optFlat"},{value:"rounded",labelKey:"optRounded"},{value:"not_sure",labelKey:"optNotSure"}],next:{flat:"sizeFlatThree",rounded:"size11Pro",not_sure:"result_family_11pro_12pro_13pro"}},
      size11Pro: {titleKey:"questionSize11Pro",hints:["size_standard","size_large"],options:[{value:"small",labelKey:"optSmall"},{value:"big",labelKey:"optBig"},{value:"not_sure",labelKey:"optNotSure"}],next:{small:"result_iphone11pro",big:"result_iphone11promax",not_sure:"result_family_11pro_11promax"}},
      sizeFlatThree: {titleKey:"questionSizeFlatThree",hints:["size_standard","size_large"],options:[{value:"standard",labelKey:"optStandard"},{value:"large",labelKey:"optLarge"},{value:"not_sure",labelKey:"optNotSure"}],next:{standard:"colorFlatThree61",large:"colorFlatThree67",not_sure:"result_family_12pro_13pro"}},
      colorFlatThree61: {titleKey:"questionColorFlatThree61",hints:["unique_12pro","unique_13pro"],options:[{value:"line12",labelKey:"optUnique12Pro"},{value:"line13",labelKey:"optUnique13Pro"},{value:"other",labelKey:"optUnknownColor"}],next:{line12:"result_iphone12pro",line13:"result_iphone13pro",other:"result_family_12pro_13pro"}},
      colorFlatThree67: {titleKey:"questionColorFlatThree67",hints:["unique_12pro","unique_13pro"],options:[{value:"line12",labelKey:"optUnique12Pro"},{value:"line13",labelKey:"optUnique13Pro"},{value:"other",labelKey:"optUnknownColor"}],next:{line12:"result_iphone12promax",line13:"result_iphone13promax",other:"result_family_12promax_13promax"}},
      dynamicIsland: {
        titleKey:"questionDynamicIsland",hints:["dynamic_island","notch"],
        options:[{value:"yes",labelKey:"optYes"},{value:"no",labelKey:"optNo"}],
        next:{yes:"diCameraCount",no:"unknownNoIslandCount"}
      },
      diCameraCount: {titleKey:"questionDiCameraCount",hints:["camera_one","camera_two","camera_three"],options:[{value:"one",labelKey:"optOne"},{value:"two",labelKey:"optTwo"},{value:"three",labelKey:"optThree"}],next:{one:"plateauOne",two:"controlTwo",three:"controlThree"}},
      controlTwo: {titleKey:"questionControlTwo",hints:["camera_control","no_camera_control"],options:[{value:"yes",labelKey:"optYes"},{value:"no",labelKey:"optNo"},{value:"not_sure",labelKey:"optNotSure"}],next:{yes:"sizeTwoControl",no:"portTwoNoControl",not_sure:"result_family_15_16_16plus_17"}},
      portTwoNoControl: {titleKey:"questionPortTwoNoControl",hints:["lightning_port","usb_c_port"],options:[{value:"lightning",labelKey:"optLightning"},{value:"usb_c",labelKey:"optUSBC"},{value:"not_sure",labelKey:"optNotSure"}],next:{lightning:"result_no_match",usb_c:"size15",not_sure:"result_family_15_15plus"}},
      controlThree: {titleKey:"questionControlThree",hints:["camera_control","no_camera_control"],options:[{value:"yes",labelKey:"optYes"},{value:"no",labelKey:"optNo"},{value:"not_sure",labelKey:"optNotSure"}],next:{yes:"plateauPro",no:"portOldPro",not_sure:"result_family_14_15_16_17_pro"}},
      portOldPro: {titleKey:"questionPortOldPro",hints:["lightning_port","usb_c_port"],options:[{value:"lightning",labelKey:"optLightning"},{value:"usb_c",labelKey:"optUSBC"},{value:"not_sure",labelKey:"optNotSure"}],next:{lightning:"size14Pro",usb_c:"size15Pro",not_sure:"result_family_14_15_pro"}},
      unknownNoIslandCount: {titleKey:"questionNoDiCount",hints:["camera_one","camera_two","camera_three"],options:[{value:"one",labelKey:"optOne"},{value:"two",labelKey:"optTwo"},{value:"three",labelKey:"optThree"}],next:{one:"portOneNoIsland",two:"portTwoNoIsland",three:"portThreeNoIsland"}},
      portOneNoIsland: {titleKey:"questionPortOneNoIsland",hints:["lightning_port","usb_c_port"],options:[{value:"lightning",labelKey:"optLightning"},{value:"usb_c",labelKey:"optUSBC"},{value:"not_sure",labelKey:"optNotSure"}],next:{lightning:"result_iphonexr",usb_c:"colorE",not_sure:"result_family_xr_16e_17e"}},
      portTwoNoIsland: {titleKey:"questionPortTwoNoIsland",hints:["lightning_port","usb_c_port"],options:[{value:"lightning",labelKey:"optLightning"},{value:"usb_c",labelKey:"optUSBC"},{value:"not_sure",labelKey:"optNotSure"}],next:{lightning:"cameraModuleShape",usb_c:"result_no_match",not_sure:"result_family_x_xs_11_12_13_14"}},
      portThreeNoIsland: {titleKey:"questionPortThreeNoIsland",hints:["lightning_port","usb_c_port"],options:[{value:"lightning",labelKey:"optLightning"},{value:"usb_c",labelKey:"optUSBC"},{value:"not_sure",labelKey:"optNotSure"}],next:{lightning:"noDiThreeFlat",usb_c:"result_no_match",not_sure:"result_family_11pro_12pro_13pro"}}
    };

    const RESULT_NODES = {
      result_iphone5c: { models: ["iPhone 5c"], mode: "single" },
      result_iphone5: { models: ["iPhone 5"], mode: "single" },
      result_se1: { models: ["iPhone SE (1st generation)"], mode: "single" },
      result_family_5s_se1: { models: ["iPhone 5s", "iPhone SE (1st generation)"], mode: "family" },
      result_family_8_se2_se3: { models: ["iPhone 8", "iPhone SE (2nd generation)", "iPhone SE (3rd generation)"], mode: "family" },
      result_iphone7: { models: ["iPhone 7"], mode: "single" },
      result_iphone6s: { models: ["iPhone 6s"], mode: "single" },
      result_iphone6: { models: ["iPhone 6"], mode: "single" },
      result_family_6_6s_7: { models: ["iPhone 6", "iPhone 6s", "iPhone 7"], mode: "family" },
      result_family_6_6s: { models: ["iPhone 6", "iPhone 6s"], mode: "family" },
      result_iphone8plus: { models: ["iPhone 8 Plus"], mode: "single" },
      result_iphone7plus: { models: ["iPhone 7 Plus"], mode: "single" },
      result_iphone6splus: { models: ["iPhone 6s Plus"], mode: "single" },
      result_iphone6plus: { models: ["iPhone 6 Plus"], mode: "single" },
      result_family_6plus_6splus_7plus: { models: ["iPhone 6 Plus", "iPhone 6s Plus", "iPhone 7 Plus"], mode: "family" },
      result_family_6plus_6splus: { models: ["iPhone 6 Plus", "iPhone 6s Plus"], mode: "family" },
      result_home_family: { models: ["iPhone 5 / 5s / SE (1st gen)", "iPhone 6 / 6s / 7 / 8 / SE", "iPhone Plus family"], mode: "family", noteKey: "homeFamilyNote" },
      result_iphone_air: { models: ["iPhone Air"], mode: "single" },
      result_iphone17e: { models: ["iPhone 17e"], mode: "single" },
      result_family_16e_17e: { models: ["iPhone 16e", "iPhone 17e"], mode: "family" , skipColor: true },
      result_iphone15: { models: ["iPhone 15"], mode: "single" },
      result_iphone15plus: { models: ["iPhone 15 Plus"], mode: "single" },
      result_family_15_15plus: { models: ["iPhone 15", "iPhone 15 Plus"], mode: "family" },
      result_iphone16: { models: ["iPhone 16"], mode: "single" },
      result_iphone17: { models: ["iPhone 17"], mode: "single" },
      result_iphone16plus: { models: ["iPhone 16 Plus"], mode: "single" },
      result_family_16_16plus: { models: ["iPhone 16", "iPhone 16 Plus"], mode: "family" , skipColor: true },
      result_family_16_16plus_17: { models: ["iPhone 16", "iPhone 16 Plus", "iPhone 17"], mode: "family" , skipColor: true },
      result_iphone14pro: { models: ["iPhone 14 Pro"], mode: "single" },
      result_iphone14promax: { models: ["iPhone 14 Pro Max"], mode: "single" },
      result_family_14pro_14promax: { models: ["iPhone 14 Pro", "iPhone 14 Pro Max"], mode: "family" },
      result_iphone15pro: { models: ["iPhone 15 Pro"], mode: "single" },
      result_iphone15promax: { models: ["iPhone 15 Pro Max"], mode: "single" },
      result_family_15pro_15promax: { models: ["iPhone 15 Pro", "iPhone 15 Pro Max"], mode: "family" },
      result_iphone16pro: { models: ["iPhone 16 Pro"], mode: "single" },
      result_iphone16promax: { models: ["iPhone 16 Pro Max"], mode: "single" },
      result_family_16pro_16promax: { models: ["iPhone 16 Pro", "iPhone 16 Pro Max"], mode: "family" },
      result_iphone17pro: { models: ["iPhone 17 Pro"], mode: "single" },
      result_iphone17promax: { models: ["iPhone 17 Pro Max"], mode: "single" },
      result_family_17pro_17promax: { models: ["iPhone 17 Pro", "iPhone 17 Pro Max"], mode: "family" },
      result_iphonexr: { models: ["iPhone XR"], mode: "single" },
      result_iphone11: { models: ["iPhone 11"], mode: "single" },
      result_iphone12mini: { models: ["iPhone 12 mini"], mode: "single" },
      result_iphone12: { models: ["iPhone 12"], mode: "single" },
      result_family_12_12mini: { models: ["iPhone 12", "iPhone 12 mini"], mode: "family" },
      result_family_11_12_12mini: { models: ["iPhone 11", "iPhone 12", "iPhone 12 mini"], mode: "family" },
      result_iphone13mini: { models: ["iPhone 13 mini"], mode: "single" },
      result_iphone14plus: { models: ["iPhone 14 Plus"], mode: "single" },
      result_family_13_13mini_14_14plus: { models: ["iPhone 13 mini", "iPhone 13", "iPhone 14", "iPhone 14 Plus"], mode: "family" },
      result_iphone13: { models: ["iPhone 13"], mode: "single" },
      result_iphone14: { models: ["iPhone 14"], mode: "single" },
      result_family_13_14: { models: ["iPhone 13", "iPhone 14"], mode: "family" , skipColor: true },
      result_family_11_12_13_14: { models: ["iPhone 11", "iPhone 12", "iPhone 13", "iPhone 14"], mode: "family" },
      result_iphone11pro: { models: ["iPhone 11 Pro"], mode: "single" },
      result_iphone11promax: { models: ["iPhone 11 Pro Max"], mode: "single" },
      result_family_11pro_11promax: { models: ["iPhone 11 Pro", "iPhone 11 Pro Max"], mode: "family" },
      result_family_11pro_12pro_13pro: { models: ["iPhone 11 Pro", "iPhone 12 Pro", "iPhone 13 Pro"], mode: "family" },
      result_iphone12pro: { models: ["iPhone 12 Pro"], mode: "single" },
      result_iphone13pro: { models: ["iPhone 13 Pro"], mode: "single" },
      result_family_12pro_13pro: { models: ["iPhone 12 Pro", "iPhone 13 Pro"], mode: "family" , skipColor: true },
      result_iphone12promax: { models: ["iPhone 12 Pro Max"], mode: "single" },
      result_iphone13promax: { models: ["iPhone 13 Pro Max"], mode: "single" },
      result_family_12promax_13promax: { models: ["iPhone 12 Pro Max", "iPhone 13 Pro Max"], mode: "family" , skipColor: true },

      result_iphone_original: { models: ["iPhone"], mode: "single", noteKey: "resultOldFamilyNote" },
      result_iphone3g: { models: ["iPhone 3G"], mode: "single", noteKey: "resultOldFamilyNote" },
      result_iphone3gs: { models: ["iPhone 3GS"], mode: "single", noteKey: "resultOldFamilyNote" },
      result_family_3g_3gs: { models: ["iPhone 3G", "iPhone 3GS"], mode: "family", noteKey: "resultOldFamilyNote" },
      result_family_4_4s: { models: ["iPhone 4", "iPhone 4s"], mode: "family", noteKey: "resultOldFamilyNote" },
      result_family_old_35: { models: ["iPhone", "iPhone 3G", "iPhone 3GS", "iPhone 4", "iPhone 4s"], mode: "family", noteKey: "resultOldFamilyNote" },
      result_iphonex: { models: ["iPhone X"], mode: "single" },
      result_iphonexs: { models: ["iPhone XS"], mode: "single" },
      result_iphonexsmax: { models: ["iPhone XS Max"], mode: "single" },
      result_family_x_xs: { models: ["iPhone X", "iPhone XS"], mode: "family", noteKey: "resultXFamilyNote" , skipColor: true },
      result_family_x_xs_xsmax: { models: ["iPhone X", "iPhone XS", "iPhone XS Max"], mode: "family", noteKey: "resultXFamilyNote" },
      result_family_x_xs_11_12_13_14: { models: ["iPhone X", "iPhone XS", "iPhone XS Max", "iPhone 11", "iPhone 12", "iPhone 12 mini", "iPhone 13", "iPhone 13 mini", "iPhone 14", "iPhone 14 Plus"], mode: "family", noteKey: "resultUnknownPortNote" },
      result_family_xr_16e_17e: { models: ["iPhone XR", "iPhone 16e", "iPhone 17e"], mode: "family", noteKey: "resultUnknownPortNote" },
      result_family_15_16_16plus_17: { models: ["iPhone 15", "iPhone 15 Plus", "iPhone 16", "iPhone 16 Plus", "iPhone 17"], mode: "family" },
      result_family_15_16_17_pro: { models: ["iPhone 15 Pro", "iPhone 15 Pro Max", "iPhone 16 Pro", "iPhone 16 Pro Max", "iPhone 17 Pro", "iPhone 17 Pro Max"], mode: "family" },
      result_family_16_17_pro: { models: ["iPhone 16 Pro", "iPhone 16 Pro Max", "iPhone 17 Pro", "iPhone 17 Pro Max"], mode: "family" },
      result_family_14_15_16_17_pro: { models: ["iPhone 14 Pro", "iPhone 14 Pro Max", "iPhone 15 Pro", "iPhone 15 Pro Max", "iPhone 16 Pro", "iPhone 16 Pro Max", "iPhone 17 Pro", "iPhone 17 Pro Max"], mode: "family" },
      result_family_14_15_pro: { models: ["iPhone 14 Pro", "iPhone 14 Pro Max", "iPhone 15 Pro", "iPhone 15 Pro Max"], mode: "family", noteKey: "resultUnknownPortNote" },
      result_no_match: { models: [], mode: "family", titleKey: "resultNoMatchTitle", noteKey: "resultNoMatchNote" },
    };

    Object.assign(STRINGS.de, {
      exactNextTitle: "Modell bestätigt",
      exactNextText: "Nutze das Ergebnis jetzt für die Preiswahl oder sende A-Nummer und Schaden per WhatsApp.",
      hint_black_white_e_title: "Schwarz oder Weiß",
      hint_black_white_e_sub: "Diese Farben kommen bei iPhone 16e und iPhone 17e vor"
    });

    Object.assign(STRINGS.uk, {
      exactNextTitle: "Модель підтверджено",
      exactNextText: "Тепер обери цю модель у прайсі або надішли A-номер і опис пошкодження у WhatsApp.",
      hint_black_white_e_title: "Чорний або білий",
      hint_black_white_e_sub: "Ці кольори зустрічаються в iPhone 16e та iPhone 17e"
    });

    Object.assign(STRINGS.en, {
      exactNextTitle: "Model confirmed",
      exactNextText: "Use this result in the price selector or send the A-number and damage description via WhatsApp.",
      hint_black_white_e_title: "Black or white",
      hint_black_white_e_sub: "These colors are available for both iPhone 16e and iPhone 17e"
    });

    const HINT_LABEL_KEYS = {
      settings_about: ["hint_settings_about_title", "hint_settings_about_sub"],
      old_plastic_back: ["hint_old_plastic_back_title", "hint_old_plastic_back_sub"],
      old_glass_back: ["hint_old_glass_back_title", "hint_old_glass_back_sub"],
      old_aluminum_back: ["hint_old_aluminum_back_title", "hint_old_aluminum_back_sub"],
      shiny_text: ["hint_shiny_text_title", "hint_shiny_text_sub"],
      matte_text: ["hint_matte_text_title", "hint_matte_text_sub"],
      pill_camera: ["hint_pill_camera_title", "hint_pill_camera_sub"],
      square_camera: ["hint_square_camera_title", "hint_square_camera_sub"],
      gold_back: ["hint_gold_back_title", "hint_gold_back_sub"],
      silver_gray: ["hint_silver_gray_title", "hint_silver_gray_sub"],
      rose_gold: ["questionRoseGold4", "hint_unique_13_sub"],
      not_rose_gold: ["optBlackWhite", "hint_silver_gray_sub"],
      settings_model_tap: ["hint_settings_model_tap_title", "hint_settings_model_tap_sub"],
      sim_tray_lookup: ["hint_sim_tray_lookup_title", "hint_sim_tray_lookup_sub"],
      connector_lookup: ["hint_connector_lookup_title", "hint_connector_lookup_sub"],
      lightning_port: ["hint_lightning_port_title", "hint_lightning_port_sub"],
      usb_c_port: ["hint_usb_c_port_title", "hint_usb_c_port_sub"],
      back_cover_lookup: ["hint_back_cover_lookup_title", "hint_back_cover_lookup_sub"],
      old_back_cover_lookup: ["hint_old_back_cover_lookup_title", "hint_old_back_cover_lookup_sub"],
      original_exterior: ["hint_original_exterior_title", "hint_original_exterior_sub"],
      home_button: ["hint_home_button_title", "hint_home_button_sub"],
      no_home_button: ["hint_no_home_button_title", "hint_no_home_button_sub"],
      dynamic_island: ["hint_dynamic_island_title", "hint_dynamic_island_sub"],
      notch: ["hint_notch_title", "hint_notch_sub"],
      camera_one: ["hint_camera_one_title", "hint_camera_one_sub"],
      camera_two: ["hint_camera_two_title", "hint_camera_two_sub"],
      camera_three: ["hint_camera_three_title", "hint_camera_three_sub"],
      camera_diagonal: ["hint_camera_diagonal_title", "hint_camera_diagonal_sub"],
      camera_vertical: ["hint_camera_vertical_title", "hint_camera_vertical_sub"],
      camera_control: ["hint_camera_control_title", "hint_camera_control_sub"],
      no_camera_control: ["hint_no_camera_control_title", "hint_no_camera_control_sub"],
      action_button: ["hint_action_button_title", "hint_action_button_sub"],
      mute_switch: ["hint_mute_switch_title", "hint_mute_switch_sub"],
      plateau_extended: ["hint_plateau_extended_title", "hint_plateau_extended_sub"],
      standard_camera_bump: ["hint_standard_camera_bump_title", "hint_standard_camera_bump_sub"],
      glass_back: ["hint_glass_back_title", "hint_glass_back_sub"],
      aluminum_back: ["hint_aluminum_back_title", "hint_aluminum_back_sub"],
      plastic_back: ["hint_plastic_back_title", "hint_plastic_back_sub"],
      headphone_jack: ["hint_headphone_jack_title", "hint_headphone_jack_sub"],
      no_headphone_jack: ["hint_no_headphone_jack_title", "hint_no_headphone_jack_sub"],
      engraved_s: ["hint_engraved_s_title", "hint_engraved_s_sub"],
      flat_edges: ["hint_flat_edges_title", "hint_flat_edges_sub"],
      rounded_edges: ["hint_rounded_edges_title", "hint_rounded_edges_sub"],
      size_small: ["hint_size_small_title", "hint_size_small_sub"],
      size_standard: ["hint_size_standard_title", "hint_size_standard_sub"],
      size_large: ["hint_size_large_title", "hint_size_large_sub"],
      soft_pink: ["hint_soft_pink_title", "hint_soft_pink_sub"],
      black_white_e: ["hint_black_white_e_title", "hint_black_white_e_sub"],
      unique_13: ["hint_unique_13_title", "hint_unique_13_sub"],
      unique_14: ["hint_unique_14_title", "hint_unique_14_sub"],
      unique_12pro: ["hint_unique_12pro_title", "hint_unique_12pro_sub"],
      unique_13pro: ["hint_unique_13pro_title", "hint_unique_13pro_sub"],
      unique_16: ["hint_unique_16_title", "hint_unique_16_sub"],
      unique_17: ["hint_unique_17_title", "hint_unique_17_sub"],
      box_receipt: ["hint_box_receipt_title", "hint_box_receipt_sub"],
      retail_label: ["hint_retail_label_title", "hint_retail_label_sub"]
    };


    Object.assign(STRINGS.de, {
      colorFinalTitle: "Welche Farbe passt am besten?",
      colorFinalSubtitleSingle: "Letzte Sichtprüfung: Wähle die passende Farbe für dieses Modell.",
      colorFinalSubtitleFamily: "Letzte Sichtprüfung: Es werden nur Farben angezeigt, die zu den verbleibenden Modellen passen.",
      colorSkip: "Farbe nicht sicher / überspringen",
      colorSelectedLabel: "Gewählte Farbe",
      colorNarrowedTitle: "Farbe hat das Ergebnis weiter eingegrenzt",
      colorNoFurtherNarrow: "Diese Farbe passt zu mehreren verbleibenden Modellen.",
      colorFinalFooter: "Wichtig: Die Farbauswahl wird nur aus den nach den vorherigen Antworten noch möglichen Modellen gebildet.",
      resultColorFilterExact: "Die Farbe passt nur noch zu diesem Modell in der verbleibenden Auswahl.",
      resultColorFilterFamily: "Die Farbe passt weiterhin zu mehreren Modellen. Für die sichere Bestätigung bitte A-Nummer prüfen.",
      resultColorQuestionTitle: "Farbauswahl",
      resultColorQuestionText: "Die letzte Frage der äußeren Erkennung verwendet nur Farben, die zu den verbleibenden Modellen passen.",
      resultNextHeight: "Automatische iFrame-Höhe ist vorbereitet.",
      colorNameBlack: "Schwarz",
      colorNameWhite: "Weiß",
      colorNameBlue: "Blau",
      colorNameGreen: "Grün",
      colorNameYellow: "Gelb",
      colorNamePink: "Pink",
      colorNameRed: "Rot",
      colorNamePurple: "Violett",
      colorNameStarlight: "Polarstern",
      colorNameMidnight: "Mitternacht",
      colorNameGraphite: "Graphit",
      colorNameSilver: "Silber",
      colorNameGold: "Gold",
      colorNameSierraBlue: "Sierrablau",
      colorNameAlpineGreen: "Alpingrün",
      colorNamePacificBlue: "Pazifikblau",
      colorNameMidnightGreen: "Mitternachtsgrün",
      colorNameSpaceGray: "Space Grau",
      colorNameSpaceBlack: "Space Schwarz",
      colorNameDeepPurple: "Dunkellila",
      colorNameBlackTitanium: "Schwarzes Titan",
      colorNameWhiteTitanium: "Weißes Titan",
      colorNameNaturalTitanium: "Naturtitan",
      colorNameDesertTitanium: "Wüstentitan",
      colorNameTeal: "Türkis",
      colorNameUltramarine: "Ultramarin",
      colorNameMistBlue: "Nebelblau",
      colorNameSage: "Salbei",
      colorNameLavender: "Lavendel",
      colorNameCloudWhite: "Wolkenweiß",
      colorNameLightGold: "Hellgold",
      colorNameSkyBlue: "Himmelblau",
      colorNameSoftPink: "Hellrosa",
      colorNameCosmicOrange: "Cosmic Orange",
      colorNameDeepBlue: "Tiefblau"
    });

    Object.assign(STRINGS.uk, {
      colorFinalTitle: "Який колір підходить найбільше?",
      colorFinalSubtitleSingle: "Остання візуальна перевірка: вибери колір, що підходить до цієї моделі.",
      colorFinalSubtitleFamily: "Остання візуальна перевірка: тут показані лише кольори, які підходять до моделей, що ще залишилися.",
      colorSkip: "Не впевнений у кольорі / пропустити",
      colorSelectedLabel: "Обраний колір",
      colorNarrowedTitle: "Колір звузив результат",
      colorNoFurtherNarrow: "Цей колір підходить кільком моделям, що ще залишилися.",
      colorFinalFooter: "Важливо: список кольорів формується тільки з моделей, які залишилися після попередніх відповідей.",
      resultColorFilterExact: "Обраний колір у поточному наборі підходить тільки цій моделі.",
      resultColorFilterFamily: "Обраний колір усе ще підходить кільком моделям. Для точного підтвердження потрібен A-number.",
      resultColorQuestionTitle: "Вибір кольору",
      resultColorQuestionText: "Останнє питання зовнішнього визначення показує тільки сумісні кольори.",
      resultNextHeight: "Автовисота для iFrame вже підготовлена.",
      colorNameBlack: "Чорний",
      colorNameWhite: "Білий",
      colorNameBlue: "Синій",
      colorNameGreen: "Зелений",
      colorNameYellow: "Жовтий",
      colorNamePink: "Рожевий",
      colorNameRed: "Червоний",
      colorNamePurple: "Фіолетовий",
      colorNameStarlight: "Starlight",
      colorNameMidnight: "Midnight",
      colorNameGraphite: "Графіт",
      colorNameSilver: "Срібний",
      colorNameGold: "Золотий",
      colorNameSierraBlue: "Sierra Blue",
      colorNameAlpineGreen: "Alpine Green",
      colorNamePacificBlue: "Pacific Blue",
      colorNameMidnightGreen: "Midnight Green",
      colorNameSpaceGray: "Space Gray",
      colorNameSpaceBlack: "Space Black",
      colorNameDeepPurple: "Темно-фіолетовий",
      colorNameBlackTitanium: "Чорний титан",
      colorNameWhiteTitanium: "Білий титан",
      colorNameNaturalTitanium: "Натуральний титан",
      colorNameDesertTitanium: "Пустельний титан",
      colorNameTeal: "Teal",
      colorNameUltramarine: "Ultramarine",
      colorNameMistBlue: "Mist Blue",
      colorNameSage: "Sage",
      colorNameLavender: "Lavender",
      colorNameCloudWhite: "Cloud White",
      colorNameLightGold: "Light Gold",
      colorNameSkyBlue: "Sky Blue",
      colorNameSoftPink: "Ніжно-рожевий",
      colorNameCosmicOrange: "Cosmic Orange",
      colorNameDeepBlue: "Deep Blue"
    });

    Object.assign(STRINGS.en, {
      colorFinalTitle: "Which color fits best?",
      colorFinalSubtitleSingle: "Final visual check: choose the matching color for this model.",
      colorFinalSubtitleFamily: "Final visual check: only colors that match the remaining models are shown here.",
      colorSkip: "Not sure about the color / skip",
      colorSelectedLabel: "Selected color",
      colorNarrowedTitle: "Color narrowed the result",
      colorNoFurtherNarrow: "This color still matches several remaining models.",
      colorFinalFooter: "Important: the color list is built only from the models that still fit after the previous answers.",
      resultColorFilterExact: "Within the remaining set, this color fits only this model.",
      resultColorFilterFamily: "This color still fits multiple models. Check the A-number for confirmation.",
      resultColorQuestionTitle: "Color selection",
      resultColorQuestionText: "The last visual question shows only compatible colors.",
      resultNextHeight: "Auto height for the iFrame is already prepared."
    });


    Object.assign(STRINGS.de, {
      questionCommonSubtitle: "Vergleiche die Beispielbilder in den Antwortkarten und tippe auf die passendste Variante.",
      optionImagePlaceholderTitle: "Beispiel nicht verfügbar",
      optionImagePlaceholderSubtitle: "Vergleiche die Beschreibung und bestätige das Ergebnis anschließend mit der A-Nummer.",
      questionControlTwo: "Gibt es rechts unten an der Seite die Kamerasteuerung (Camera Control)?",
      questionControlThree: "Gibt es rechts unten an der Seite die Kamerasteuerung (Camera Control)?",
      questionSizeTwoControl: "Welche Größe passt besser? 6,1 Zoll spricht eher für iPhone 16, 6,3 Zoll eher für iPhone 17.",
      questionColorTwoControl: "Welche der typischen Farben passt besser? Es werden nur passende Farben gezeigt.",
      questionColorE: "Welche Farbe passt besser? Schwarz und Weiß passen zu beiden, Soft Pink nur zu iPhone 17e.",
      questionPlateauOne: "Wirkt der obere Kamerabereich hinten wie ein breites Band fast über die ganze Breite?",
      questionPlateauPro: "Wirkt der obere Kamerabereich hinten wie ein breites Band fast über die ganze Breite?",
      optStandard61: "6,1 Zoll / eher wie iPhone 16",
      optStandard63: "6,3 Zoll / eher wie iPhone 17",
      optLarge67: "6,7 Zoll / eher wie iPhone 16 Plus",
      hint_dynamic_island_sub: "Oben im Display ist eine pillenförmige Aussparung sichtbar.",
      hint_notch_sub: "Oben im Display ist eine klassische Notch sichtbar.",
      hint_camera_control_sub: "Zusätzliche Taste unten rechts am Rahmen.",
      hint_no_camera_control_sub: "Keine zusätzliche Taste unten rechts am Rahmen.",
      hint_unique_16_sub: "Typische 16-Farben: Pink, Teal oder Ultramarine.",
      hint_unique_17_sub: "Typische 17-Farben: Mist Blue, Sage oder Lavender.",
      hint_size_standard_sub: "Normale Größe in der Hand. Bei neueren Modellen oft 6,1 oder 6,3 Zoll.",
      hint_size_large_sub: "Große Plus- oder Max-Größe. Das Gerät wirkt deutlich höher und breiter.",
      visualWarnText: "Visuelle Erkennung ist nur zuverlässig, wenn Gehäuse, Rückglas und äußere Teile noch original sind."
    });

    Object.assign(STRINGS.uk, {
      questionCommonSubtitle: "Порівняй приклади на картках відповіді і натисни на найбільш схожий варіант.",
      optionImagePlaceholderTitle: "Приклад недоступний",
      optionImagePlaceholderSubtitle: "Порівняй опис, а потім підтвердь результат за A-номером.",
      questionControlTwo: "Праворуч унизу на рамці є кнопка Camera Control?",
      questionControlThree: "Праворуч унизу на рамці є кнопка Camera Control?",
      questionSizeTwoControl: "Який розмір ближчий? 6,1 дюйма частіше означає iPhone 16, а 6,3 дюйма - iPhone 17.",
      questionColorTwoControl: "Який із типових кольорів ближчий? Тут показані тільки сумісні варіанти.",
      questionColorE: "Який колір ближчий? Чорний і білий підходять до обох, Soft Pink - тільки до iPhone 17e.",
      questionPlateauOne: "Верхня зона камери ззаду виглядає як широка смуга майже на всю ширину?",
      questionPlateauPro: "Верхній блок камер ззаду виглядає як широка смуга майже на всю ширину?",
      optStandard61: "6,1 дюйма / ближче до iPhone 16",
      optStandard63: "6,3 дюйма / ближче до iPhone 17",
      optLarge67: "6,7 дюйма / ближче до iPhone 16 Plus",
      hint_dynamic_island_sub: "Угорі екрана видно овальний виріз Dynamic Island.",
      hint_notch_sub: "Угорі екрана видно класичний виріз notch.",
      hint_camera_control_sub: "Додаткова кнопка керування камерою праворуч унизу на рамці.",
      hint_no_camera_control_sub: "Праворуч унизу на рамці немає додаткової кнопки.",
      hint_unique_16_sub: "Типові кольори 16: Pink, Teal або Ultramarine.",
      hint_unique_17_sub: "Типові кольори 17: Mist Blue, Sage або Lavender.",
      hint_size_standard_sub: "Звичайний розмір у руці. У нових моделях це часто 6,1 або 6,3 дюйма.",
      hint_size_large_sub: "Великий формат Plus або Max. Телефон помітно вищий і ширший у руці.",
      visualWarnText: "Візуальне визначення надійне тільки тоді, коли корпус, заднє скло та зовнішні деталі ще оригінальні."
    });

    Object.assign(STRINGS.en, {
      questionCommonSubtitle: "Compare the example images inside the answer cards and tap the closest match.",
      optionImagePlaceholderTitle: "Example unavailable",
      optionImagePlaceholderSubtitle: "Compare the description, then confirm the result with the A-number.",
      questionControlTwo: "Is there a Camera Control button on the lower right side of the frame?",
      questionControlThree: "Is there a Camera Control button on the lower right side of the frame?",
      questionSizeTwoControl: "Which size is closer? 6.1 inches usually points to iPhone 16, while 6.3 inches points to iPhone 17.",
      questionColorTwoControl: "Which typical color is closer? Only compatible options are shown here.",
      questionColorE: "Which color is closer? Black and white fit both, while Soft Pink points only to iPhone 17e.",
      questionPlateauOne: "Does the upper camera area look like a wide bar across most of the phone width?",
      questionPlateauPro: "Does the upper rear camera area look like a wide bar across most of the phone width?",
      optStandard61: "6.1-inch / closer to iPhone 16",
      optStandard63: "6.3-inch / closer to iPhone 17",
      optLarge67: "6.7-inch / closer to iPhone 16 Plus",
      hint_dynamic_island_sub: "A pill-shaped cutout is visible at the top of the display.",
      hint_notch_sub: "A classic notch is visible at the top of the display.",
      hint_camera_control_sub: "Extra camera button on the lower right side of the frame.",
      hint_no_camera_control_sub: "No extra button on the lower right side of the frame.",
      hint_unique_16_sub: "Typical iPhone 16 colors: Pink, Teal, or Ultramarine.",
      hint_unique_17_sub: "Typical iPhone 17 colors: Mist Blue, Sage, or Lavender.",
      hint_size_standard_sub: "Regular size in the hand. On newer models this is often 6.1 or 6.3 inches.",
      hint_size_large_sub: "Large Plus or Max size. The phone feels clearly taller and wider.",
      visualWarnText: "Visual matching is reliable only when the housing, back glass, and outer parts are still original."
    });

    const COLOR_NAME_KEYS = {
      "Black": "colorNameBlack",
      "White": "colorNameWhite",
      "Blue": "colorNameBlue",
      "Green": "colorNameGreen",
      "Yellow": "colorNameYellow",
      "Pink": "colorNamePink",
      "Red": "colorNameRed",
      "Purple": "colorNamePurple",
      "Starlight": "colorNameStarlight",
      "Midnight": "colorNameMidnight",
      "Graphite": "colorNameGraphite",
      "Silver": "colorNameSilver",
      "Gold": "colorNameGold",
      "Sierra Blue": "colorNameSierraBlue",
      "Alpine Green": "colorNameAlpineGreen",
      "Pacific Blue": "colorNamePacificBlue",
      "Midnight Green": "colorNameMidnightGreen",
      "Space Gray": "colorNameSpaceGray",
      "Space Black": "colorNameSpaceBlack",
      "Deep Purple": "colorNameDeepPurple",
      "Black Titanium": "colorNameBlackTitanium",
      "White Titanium": "colorNameWhiteTitanium",
      "Natural Titanium": "colorNameNaturalTitanium",
      "Desert Titanium": "colorNameDesertTitanium",
      "Teal": "colorNameTeal",
      "Ultramarine": "colorNameUltramarine",
      "Mist Blue": "colorNameMistBlue",
      "Sage": "colorNameSage",
      "Lavender": "colorNameLavender",
      "Cloud White": "colorNameCloudWhite",
      "Light Gold": "colorNameLightGold",
      "Sky Blue": "colorNameSkyBlue",
      "Soft Pink": "colorNameSoftPink",
      "Cosmic Orange": "colorNameCosmicOrange",
      "Deep Blue": "colorNameDeepBlue"
    };

    function displayColorName(name) {
      return COLOR_NAME_KEYS[name] ? t(COLOR_NAME_KEYS[name]) : name;
    }

    function colorId(name) {
      return String(name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    }

    function getColorChoices(models) {
      const map = new Map();
      models.forEach(model => {
        (MODEL_DATA[model] || []).forEach(color => {
          const id = colorId(color.name);
          if (!map.has(id)) {
            map.set(id, { id, name: color.name, hex: color.hex, models: [model] });
          } else {
            const item = map.get(id);
            if (!item.models.includes(model)) item.models.push(model);
          }
        });
      });
      return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
    }

    function hasUsefulColorChoices(models) {
      if (!Array.isArray(models) || models.length <= 1) return false;
      const choices = getColorChoices(models);
      return choices.some(choice => choice.models.length < models.length);
    }

    function canAskColorQuestion(resultId) {
      const raw = RESULT_NODES[resultId];
      if (!raw || raw.skipColor || !Array.isArray(raw.models) || !raw.models.length) return false;
      if (!raw.models.every(model => Array.isArray(MODEL_DATA[model]) && MODEL_DATA[model].length > 0)) return false;
      return hasUsefulColorChoices(raw.models);
    }

    function normalizeToolLang(value) {
      const code = String(value || "").toLowerCase().split("-")[0];
      if (code === "ua") return "uk";
      if (["de", "uk", "en"].includes(code)) return code;
      return "de";
    }

    let requestedToolLang = "de";
    try {
      requestedToolLang = new URLSearchParams(window.location.search).get("lang") || "de";
    } catch (_) {}

    const state = {
      lang: normalizeToolLang(requestedToolLang),
      screen: "start",
      nodeId: null,
      history: [],
      answers: {},
      lookupValue: "",
      lookupSource: null,
      result: null,
      feedback: null,
      pendingResultId: null,
      pendingModels: null,
      selectedColorName: null,
      selectedColorNarrowed: false,
      isTransitioning: false,
      transitionDirection: "forward"
    };

    const screenEl = document.getElementById("screen");
    const hintGalleryEl = document.getElementById("hintGallery");
    const progressFillEl = document.getElementById("progressFill");
    const stepChipEl = document.getElementById("stepChip");
    const pathChipEl = document.getElementById("pathChip");

    document.documentElement.lang = state.lang;
    document.documentElement.dir = "ltr";

    function t(key) {
      return STRINGS[state.lang]?.[key] || STRINGS.de?.[key] || key;
    }

    function snapshot() {
      return JSON.stringify({
        screen: state.screen,
        nodeId: state.nodeId,
        answers: state.answers,
        lookupValue: state.lookupValue,
        lookupSource: state.lookupSource,
        result: state.result,
        feedback: state.feedback
      });
    }

    function pushHistory() {
      state.history.push(snapshot());
    }

    function showLoadingPulse() {
      const mainCard = document.querySelector(".main-card");
      if (!mainCard) return;
      mainCard.classList.remove("is-loading");
      void mainCard.offsetWidth;
      mainCard.classList.add("is-loading");
      window.clearTimeout(showLoadingPulse._timer);
      showLoadingPulse._timer = window.setTimeout(() => mainCard.classList.remove("is-loading"), 640);
    }

    function wrapScreen(direction = "forward") {
      const existingWrap = screenEl.firstElementChild;
      if (existingWrap && existingWrap.classList.contains("screen-wrap") && screenEl.children.length === 1) {
        existingWrap.classList.add(direction === "backward" ? "screen-enter-backward" : "screen-enter-forward");
        return existingWrap;
      }
      const wrap = document.createElement("div");
      wrap.className = "screen-wrap " + (direction === "backward" ? "screen-enter-backward" : "screen-enter-forward");
      while (screenEl.firstChild) wrap.appendChild(screenEl.firstChild);
      screenEl.appendChild(wrap);
      return wrap;
    }

    function staggerElements(elements, step = 52, max = 360) {
      Array.from(elements || []).forEach((el, index) => {
        el.classList.add("stagger-item");
        el.style.setProperty("--stagger-delay", `${Math.min(index * step, max)}ms`);
      });
    }

    function setupImageLoadingEffects(root) {
      root.querySelectorAll(".photo-slot, .option-media").forEach(frame => frame.classList.add("loading"));
      root.querySelectorAll("img").forEach(img => {
        if (img.dataset.animBound === "1") return;
        img.dataset.animBound = "1";
        img.classList.add("img-loading");
        const frame = img.closest(".photo-slot, .option-media");
        const clear = () => {
          img.classList.remove("img-loading");
          if (frame) frame.classList.remove("loading");
        };
        if (img.complete) {
          requestAnimationFrame(clear);
        } else {
          img.addEventListener("load", clear, { once: true });
          img.addEventListener("error", clear, { once: true });
        }
      });
    }

    function bindMicroMotion(root = screenEl) {
      root.querySelectorAll("button").forEach(btn => {
        if (btn.dataset.microBound === "1") return;
        btn.dataset.microBound = "1";
        const release = () => btn.classList.remove("is-pressing");
        btn.addEventListener("pointerdown", () => btn.classList.add("is-pressing"));
        btn.addEventListener("pointerup", release);
        btn.addEventListener("pointerleave", release);
        btn.addEventListener("pointercancel", release);
      });
    }

    function enhanceRenderedScreen(direction = "forward") {
      const wrap = wrapScreen(direction);
      const hero = wrap.querySelector(".model-name, .screen-title");
      if (hero && state.screen === "result") hero.classList.add("result-hero");
      staggerElements(wrap.querySelectorAll(".screen-title, .screen-subtitle, .result-chip, .alert, .lookup-box, .help-card, .path-btn, .option-btn, .color-option-btn, .summary-card, .result-box, .tip-box, .cta-box, .actions-row > *, .photo-slot"), 42, 320);
      staggerElements(hintGalleryEl.querySelectorAll(".photo-slot"), 70, 280);
      setupImageLoadingEffects(document.body);
      bindMicroMotion(document.body);
    }

    function transitionTo(mutator, direction = "forward", options = {}) {
      if (state.isTransitioning) return;
      state.isTransitioning = true;
      state.transitionDirection = direction;
      const currentWrap = screenEl.querySelector(".screen-wrap");
      const triggerEl = options.triggerEl || null;
      if (triggerEl) triggerEl.classList.add("selected", "is-pressing");
      if (options.loader !== false) showLoadingPulse();
      if (currentWrap) {
        currentWrap.classList.remove("screen-enter-forward", "screen-enter-backward");
        currentWrap.classList.add(direction === "backward" ? "screen-exit-backward" : "screen-exit-forward");
      }
      const delay = currentWrap ? (options.delay || 170) : 0;
      window.setTimeout(() => {
        try {
          mutator();
        } finally {
          render(direction);
          window.setTimeout(() => { state.isTransitioning = false; }, 40);
        }
      }, delay);
    }

    function navigateChoice(triggerEl, mutator, direction = "forward") {
      transitionTo(mutator, direction, { triggerEl, loader: true, delay: 160 });
    }


    function restoreLast() {
      const prev = state.history[state.history.length - 1];
      if (!prev) return;
      transitionTo(() => {
        const data = JSON.parse(state.history.pop());
        state.screen = data.screen;
        state.nodeId = data.nodeId;
        state.answers = data.answers || {};
        state.lookupValue = data.lookupValue || "";
        state.lookupSource = data.lookupSource || null;
        state.result = data.result || null;
        state.feedback = data.feedback || null;
      }, "backward", { loader: false, delay: 170 });
    }

    function resetApp() {
      transitionTo(() => {
        state.screen = "start";
        state.nodeId = null;
        state.history = [];
        state.answers = {};
        state.lookupValue = "";
        state.lookupSource = null;
        state.result = null;
        state.feedback = null;
        state.pendingResultId = null;
        state.pendingModels = null;
        state.selectedColorName = null;
        state.selectedColorNarrowed = false;
      }, "backward", { loader: true, delay: 160 });
    }

    function setTopText() {
      document.getElementById("brandTitle").textContent = t("brandTitle");
      document.getElementById("brandSubtitle").textContent = t("brandSubtitle");
      document.getElementById("hintsTitle").textContent = t("hintsTitle");
      document.getElementById("hintsSubtitle").textContent = t("hintsSubtitle");
      document.getElementById("photoConfigNote").textContent = t("photoConfigNote");
    }

    function normalizeANumber(value) {
      return String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
    }

    function normalizeModelToken(value) {
      return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
    }

    function lookupModelByName(value) {
      const key = normalizeModelToken(value);
      return MODEL_NAME_ALIASES[key] || null;
    }

    function colorHtmlForModels(models) {
      const usable = (models || []).filter(m => MODEL_DATA[m] && MODEL_DATA[m].length);
      if (!usable.length) return "";
      const groups = usable.map(model => {
        const referenceImage = MODEL_COLOR_IMAGES[model];
        const referenceHtml = referenceImage ? `
          <img
            class="model-color-reference"
            src="../assets/model-finder/v12/colors/${referenceImage}"
            alt="${t("resultColorTitle")}: ${model}"
            width="720"
            height="480"
            loading="lazy"
            decoding="async"
          >
        ` : "";
        const swatches = MODEL_DATA[model].map(color => `
          <span class="color-swatch">
            <span class="color-dot" style="background:${color.hex};"></span>
            <span>${displayColorName(color.name)}</span>
          </span>
        `).join("");
        return `
          <div class="color-model-card">
            <h4>${model}</h4>
            ${referenceHtml}
            <div class="color-swatches">${swatches}</div>
          </div>
        `;
      }).join("");
      return `
        <div class="summary-card" style="margin-top:18px;">
          <h3>${t("resultColorTitle")}</h3>
          <p class="screen-subtitle" style="margin:0 0 14px;font-size:15px;">${t("resultColorSubtitle")}</p>
          <div class="color-groups">${groups}</div>
        </div>
      `;
    }


    function makePlaceholderSvg(title, subtitle) {
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750">
          <defs>
            <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stop-color="#223257"/>
              <stop offset="100%" stop-color="#18213d"/>
            </linearGradient>
          </defs>
          <rect width="1200" height="750" rx="28" fill="url(#g)"/>
          <rect x="40" y="40" width="1120" height="670" rx="24" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="3"/>
          <circle cx="165" cy="145" r="54" fill="rgba(124,156,255,0.22)" stroke="rgba(255,255,255,0.14)" stroke-width="3"/>
          <path d="M145 145h40M165 125v40" stroke="#dfe7ff" stroke-width="10" stroke-linecap="round"/>
          <text x="80" y="260" fill="#eef2ff" font-family="Arial, sans-serif" font-size="56" font-weight="700">${escapeXml(title)}</text>
          <text x="80" y="330" fill="#b7c0de" font-family="Arial, sans-serif" font-size="28">${escapeXml(subtitle)}</text>
          <text x="80" y="640" fill="rgba(255,255,255,0.35)" font-family="Arial, sans-serif" font-size="22">Nutze die Hinweise, um die Modellnummer sicher zu finden.</text>
        </svg>`;
      return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
    }

    function escapeXml(value) {
      return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
    }

    function renderHints(keys) {
      hintGalleryEl.innerHTML = "";
      const list = (keys && keys.length ? keys : ["settings_about", "sim_tray_lookup", "connector_lookup"]).slice(0, 4);
      list.forEach(key => {
        const [titleKey, subKey] = HINT_LABEL_KEYS[key] || ["hintsTitle", "hintsSubtitle"];
        const title = t(titleKey);
        const subtitle = t(subKey);
        const meta = getHintMeta(key, title, subtitle);
        const card = document.createElement("figure");
        card.className = "photo-slot";
        card.innerHTML = `
          <img src="${meta.src}" alt="${t("hintAltPrefix")}: ${title}" width="${meta.width}" height="${meta.height}" loading="lazy" decoding="async">
          <figcaption class="caption">
            <strong>${title}</strong>
            <span>${subtitle}</span>
          </figcaption>
        `;
        hintGalleryEl.appendChild(card);
      });
    }

    function getHintMeta(key, fallbackTitle = "", fallbackSubtitle = "") {
      if (!key) {
        return {
          title: fallbackTitle || t("optionImagePlaceholderTitle"),
          subtitle: fallbackSubtitle || t("optionImagePlaceholderSubtitle"),
          src: makePlaceholderSvg(fallbackTitle || t("optionImagePlaceholderTitle"), fallbackSubtitle || t("optionImagePlaceholderSubtitle")),
          width: 1200,
          height: 750
        };
      }
      const [titleKey, subKey] = HINT_LABEL_KEYS[key] || [];
      const title = titleKey ? t(titleKey) : (fallbackTitle || t("optionImagePlaceholderTitle"));
      const subtitle = subKey ? t(subKey) : (fallbackSubtitle || t("optionImagePlaceholderSubtitle"));
      const src = PHOTO_HINTS[key] || makePlaceholderSvg(title, subtitle);
      return {
        title,
        subtitle,
        src,
        width: PHOTO_HINTS[key] ? 720 : 1200,
        height: PHOTO_HINTS[key] ? 480 : 750
      };
    }

    function getOptionPhotoKey(nodeId, node, option, index) {
      const value = option.value;
      const hints = Array.isArray(node.hints) ? node.hints : [];
      const explicitMap = {
        connectorType: { lightning: "lightning_port", usb_c: "usb_c_port", not_sure: "lightning_port" },
        usbDynamicIsland: { yes: "dynamic_island", no: "notch" },
        lightningDynamicIsland: { yes: "dynamic_island", no: "notch" },
        oldSmallBack: { plastic: "old_plastic_back", glass: "old_glass_back", aluminum: "old_aluminum_back", not_sure: "old_glass_back" },
        oldPlasticPrint: { shiny: "shiny_text", matte: "matte_text", not_sure: "shiny_text" },
        cameraModuleShape: { pill: "pill_camera", square: "square_camera", not_sure: "square_camera" },
        sizeXFamily: { small58: "size_standard", large65: "size_large", not_sure: "size_standard" },
        colorXFamily: { gold: "gold_back", silver_gray: "silver_gray", not_sure: "silver_gray" },
        portOneNoIsland: { lightning: "lightning_port", usb_c: "usb_c_port", not_sure: "lightning_port" },
        portTwoNoIsland: { lightning: "lightning_port", usb_c: "usb_c_port", not_sure: "lightning_port" },
        portThreeNoIsland: { lightning: "lightning_port", usb_c: "usb_c_port", not_sure: "lightning_port" },
        usbControlTwo: { yes: "camera_control", no: "no_camera_control", not_sure: "camera_control" },
        usbControlThree: { yes: "camera_control", no: "no_camera_control", not_sure: "camera_control" },
        originalExterior: { yes: "original_exterior", no: "original_exterior", not_sure: "original_exterior" },
        homeButton: { yes: "home_button", no: "no_home_button" },
        dynamicIsland: { yes: "dynamic_island", no: "notch" },
        diCameraCount: { one: "camera_one", two: "camera_two", three: "camera_three" },
        noDiCameraCount: { one: "camera_one", two: "camera_two", three: "camera_three" },
        controlTwo: { yes: "camera_control", no: "no_camera_control" },
        controlThree: { yes: "camera_control", no: "no_camera_control" },
        actionOldPro: { yes: "action_button", no: "mute_switch" },
        plateauOne: { yes: "plateau_extended", no: "standard_camera_bump" },
        plateauPro: { yes: "plateau_extended", no: "standard_camera_bump" },
        noDiTwoLayout: { diagonal: "camera_diagonal", vertical: "camera_vertical", not_sure: "camera_diagonal" },
        noDiTwoFlat: { flat: "flat_edges", rounded: "rounded_edges", not_sure: "flat_edges" },
        noDiThreeFlat: { flat: "flat_edges", rounded: "rounded_edges", not_sure: "flat_edges" },
        sizeDiagonalTwo: { small: "size_small", standard: "size_standard", large: "size_large", not_sure: "size_standard" },
        sizeVerticalFlatTwo: { small: "size_small", standard: "size_standard", not_sure: "size_standard" },
        size14Pro: { standard: "size_standard", large: "size_large", not_sure: "size_standard" },
        size15Pro: { standard: "size_standard", large: "size_large", not_sure: "size_standard" },
        size16Pro: { standard: "size_standard", large: "size_large", not_sure: "size_standard" },
        size17Pro: { standard: "size_standard", large: "size_large", not_sure: "size_standard" },
        size15: { standard: "size_standard", large: "size_large", not_sure: "size_standard" },
        sizeTwoControl: { 61: "size_standard", 63: "unique_17", 67: "size_large", not_sure: "size_standard" },
        colorTwoControl: { line16: "unique_16", line17: "unique_17", other: "unique_16" },
        colorE: { soft_pink: "soft_pink", other: "black_white_e", not_sure: "black_white_e" },
        colorDiagonal61: { line13: "unique_13", line14: "unique_14", other: "unique_13" },
        colorFlatThree61: { line12pro: "unique_12pro", line13pro: "unique_13pro", other: "unique_12pro" },
        colorFlatThree67: { line12pro: "unique_12pro", line13pro: "unique_13pro", other: "unique_12pro" },
        homeBackMaterial47: { glass: "glass_back", metal: "aluminum_back", not_sure: "glass_back" },
        homeBackMaterial55: { glass: "glass_back", metal: "aluminum_back", not_sure: "glass_back" },
        homeHeadphone47: { yes: "headphone_jack", no: "no_headphone_jack", not_sure: "no_headphone_jack" },
        homeHeadphone55: { yes: "headphone_jack", no: "no_headphone_jack", not_sure: "no_headphone_jack" },
        homeEngravedS47: { yes: "engraved_s", no: "engraved_s", not_sure: "engraved_s" },
        homeEngravedS55: { yes: "engraved_s", no: "engraved_s", not_sure: "engraved_s" }
      };
      if (explicitMap[nodeId] && explicitMap[nodeId][value]) return explicitMap[nodeId][value];
      const genericMap = {
        yes: hints[0],
        no: hints[1] || hints[0],
        one: "camera_one",
        two: "camera_two",
        three: "camera_three",
        diagonal: "camera_diagonal",
        vertical: "camera_vertical",
        lightning: "lightning_port",
        usb_c: "usb_c_port",
        glass: "glass_back",
        metal: "aluminum_back",
        plastic: "plastic_back",
        flat: "flat_edges",
        rounded: "rounded_edges",
        small: "size_small",
        standard: "size_standard",
        large: "size_large",
        not_sure: hints[0] || null
      };
      return genericMap[value] || hints[index] || hints[0] || null;
    }

    function optionImageHtml(nodeId, node, option, index) {
      const label = t(option.labelKey);
      const hintKey = getOptionPhotoKey(nodeId, node, option, index);
      const meta = getHintMeta(hintKey, label, t("optionImagePlaceholderSubtitle"));
      return `
        <span class="option-media">
          <img src="${meta.src}" alt="" width="${meta.width}" height="${meta.height}" loading="lazy" decoding="async" aria-hidden="true">
          <span class="option-media-badge" aria-hidden="true">${t("hintAltPrefix")}</span>
        </span>
        <span class="option-copy">
          <strong>${label}</strong>
          <span class="option-caption">${meta.subtitle || t("optionImagePlaceholderSubtitle")}</span>
          <span>${t("continueBtn")}</span>
        </span>
      `;
    }

    function colorIconHtml(choice) {
      const icon = COLOR_ICONS[choice.name];
      if (icon) {
        return `<img class="color-icon-img" src="${icon}" alt="${displayColorName(choice.name)}" loading="lazy" decoding="async">`;
      }
      return `<span class="color-dot" style="width:34px;height:34px;flex:0 0 auto;background:${choice.hex};"></span>`;
    }

    function progressValue() {
      if (state.screen === "start") return 8;
      if (state.screen === "settings") return 25;
      if (state.screen === "device") return 35;
      if (state.screen === "visualIntro") return 16;
      if (state.screen === "visualQuestion") {
        const count = Object.keys(state.answers || {}).length;
        return Math.min(80, 18 + count * 9);
      }
      if (state.screen === "result") return 100;
      return 10;
    }

    function updateTopChips() {
      progressFillEl.classList.remove("progress-bump");
      progressFillEl.style.width = `${progressValue()}%`;
      void progressFillEl.offsetWidth;
      progressFillEl.classList.add("progress-bump");
      if (state.screen === "start") {
        stepChipEl.textContent = t("chipStart");
        pathChipEl.textContent = t("pathFast");
      } else if (state.screen === "settings" || state.screen === "device" || state.screen === "box") {
        stepChipEl.textContent = t("stepExact");
        pathChipEl.textContent = t("pathFast");
      } else if (state.screen === "visualIntro" || state.screen === "visualQuestion") {
        stepChipEl.textContent = `${t("stepQuestion")}${state.nodeId ? " · " + (Object.keys(state.answers).length + 1) : ""}`;
        pathChipEl.textContent = t("pathVisual");
      } else if (state.screen === "result") {
        stepChipEl.textContent = state.result && state.result.kind === "exact" ? t("stepExact") : t("stepVisual");
        pathChipEl.textContent = state.result && state.result.kind === "exact" ? t("pathFast") : t("pathVisual");
      }
    }

    function renderStart() {
      renderHints(["settings_about", "sim_tray_lookup", "connector_lookup", "box_receipt"]);
      screenEl.innerHTML = `
        <div class="eyebrow">${t("eyebrowStart")}</div>
        <h2 class="screen-title">${t("startTitle")}</h2>
        <p class="screen-subtitle">${t("startSubtitle")}</p>

        <div class="path-grid">
          <button class="path-btn" type="button" id="goSettingsBtn">
            <strong>${t("startPath1Title")}</strong>
            <span>${t("startPath1Text")}</span>
          </button>
          <button class="path-btn" type="button" id="goDeviceBtn">
            <strong>${t("startPath2Title")}</strong>
            <span>${t("startPath2Text")}</span>
          </button>
          <button class="path-btn" type="button" id="goVisualBtn">
            <strong>${t("startPath3Title")}</strong>
            <span>${t("startPath3Text")}</span>
          </button>
          <button class="path-btn" type="button" id="goBoxBtn">
            <strong>${t("startPath4Title")}</strong>
            <span>${t("startPath4Text")}</span>
          </button>
        </div>

        <div class="divider"></div>

        <div class="tip-box">
          <h3>${t("startTipTitle")}</h3>
          <ul class="mini-list">
            <li>${t("startTip1")}</li>
            <li>${t("startTip2")}</li>
            <li>${t("startTip3")}</li>
          </ul>
        </div>
      `;
      document.getElementById("goSettingsBtn").onclick = (event) => {
        pushHistory();
        navigateChoice(event.currentTarget, () => {
          state.screen = "settings";
          state.lookupSource = "settings";
          state.feedback = null;
        });
      };
      document.getElementById("goDeviceBtn").onclick = (event) => {
        pushHistory();
        navigateChoice(event.currentTarget, () => {
          state.screen = "device";
          state.lookupSource = "device";
          state.feedback = null;
        });
      };
      document.getElementById("goVisualBtn").onclick = (event) => {
        pushHistory();
        navigateChoice(event.currentTarget, () => {
          state.screen = "visualIntro";
          state.feedback = null;
        });
      };
      document.getElementById("goBoxBtn").onclick = (event) => {
        pushHistory();
        navigateChoice(event.currentTarget, () => {
          state.screen = "box";
          state.lookupSource = "box";
          state.feedback = null;
        });
      };
    }

    function renderLookup(screenType) {
      const isSettings = screenType === "settings";
      const isBox = screenType === "box";
      renderHints(isSettings ? ["settings_about", "settings_model_tap"] : (isBox ? ["box_receipt", "retail_label"] : ["sim_tray_lookup", "connector_lookup", "back_cover_lookup", "old_back_cover_lookup"]));
      const title = isSettings ? t("settingsTitle") : (isBox ? t("boxTitle") : t("deviceTitle"));
      const subtitle = isSettings ? t("settingsSubtitle") : (isBox ? t("boxSubtitle") : t("deviceSubtitle"));
      const extra = isSettings ? `
        <div class="help-grid">
          <div class="help-card"><h3>1</h3><p>${t("settingsStep1")}</p></div>
          <div class="help-card"><h3>2</h3><p>${t("settingsStep2")}</p></div>
          <div class="help-card"><h3>3</h3><p>${t("settingsStep3")}</p></div>
          <div class="help-card"><h3>4</h3><p>${t("settingsStep4")}</p></div>
        </div>
      ` : isBox ? `
        <div class="help-grid">
          <div class="help-card"><h3>${t("boxCard1Title")}</h3><p>${t("boxCard1Text")}</p></div>
          <div class="help-card"><h3>${t("boxCard2Title")}</h3><p>${t("boxCard2Text")}</p></div>
          <div class="help-card"><h3>${t("boxCard3Title")}</h3><p>${t("boxCard3Text")}</p></div>
        </div>
      ` : `
        <div class="help-grid">
          <div class="help-card"><h3>${t("deviceCard1Title")}</h3><p>${t("deviceCard1Text")}</p></div>
          <div class="help-card"><h3>${t("deviceCard2Title")}</h3><p>${t("deviceCard2Text")}</p></div>
          <div class="help-card"><h3>${t("deviceCard3Title")}</h3><p>${t("deviceCard3Text")}</p></div>
        </div>
      `;

      const officialGuide = isBox ? "" : `
        <div class="official-guide">
          <h3>${t("officialGuideTitle")}</h3>
          <p>${t("officialGuideIntro")}</p>
          <div class="official-steps">
            <div class="official-step"><strong>${t("guideSettingsTitle")}</strong><span>${t("guideSettingsText")}</span></div>
            <div class="official-step"><strong>${t("guideBackTitle")}</strong><span>${t("guideBackText")}</span></div>
            <div class="official-step"><strong>${t("guideSimTitle")}</strong><span>${t("guideSimText")}</span></div>
            <div class="official-step"><strong>${t("guidePortTitle")}</strong><span>${t("guidePortText")}</span></div>
          </div>
        </div>
      `;

      screenEl.innerHTML = `
        <div class="eyebrow">${t("stepExact")}</div>
        <h2 class="screen-title">${title}</h2>
        <p class="screen-subtitle">${subtitle}</p>

        ${extra}
        ${officialGuide}

        <div class="divider"></div>

        <div class="lookup-box">
          <h3>${isBox ? t("boxInputLabel") : t("settingsInputLabel")}</h3>
          <p class="lookup-hint">${isBox ? t("boxLookupHint") : t("lookupHint")}</p>
          <div class="lookup-form">
            <input id="aNumberInput" class="lookup-input ${isBox ? "" : "compact-input"}" ${isBox ? "" : 'maxlength="5"'} value="${state.lookupValue || ""}" placeholder="${isBox ? t("boxInputPlaceholder") : t("settingsInputPlaceholder")}" aria-label="lookup input">
            <button type="button" class="cta" id="lookupBtn">${t("lookupButton")}</button>
          </div>
        </div>

        <div class="tip-box" style="margin-top:16px;">
          <h3>${t("inputHelpTitle")}</h3>
          <ul class="mini-list">
            <li>${t("inputHelp1")}</li>
            <li>${t("inputHelp2")}</li>
            <li>${t("inputHelp3")}</li>
          </ul>
        </div>

        ${state.feedback ? `<div class="alert danger" style="margin-top:16px;">${state.feedback}</div>` : ""}

        <div class="actions-row">
          <button type="button" class="ghost-btn" id="backFromLookup">${t("backBtn")}</button>
          <button type="button" class="secondary-btn" id="switchLookupPath">${isSettings ? t("goDevice") : (isBox ? t("goSettings") : t("goSettings"))}</button>
          ${isBox ? "" : `<button type="button" class="secondary-btn" id="toBoxFromLookup">${t("goBox")}</button>`}
          <button type="button" class="secondary-btn" id="toVisualFromLookup">${t("goVisual")}</button>
        </div>
      `;

      const input = document.getElementById("aNumberInput");
      input.addEventListener("input", () => {
        if (isBox) {
          state.lookupValue = input.value;
        } else {
          state.lookupValue = normalizeANumber(input.value).slice(0, 5);
          input.value = state.lookupValue;
        }
      });
      input.addEventListener("keydown", e => {
        if (e.key === "Enter") doLookup();
      });

      document.getElementById("lookupBtn").onclick = doLookup;
      document.getElementById("backFromLookup").onclick = restoreLast;
      document.getElementById("switchLookupPath").onclick = (event) => {
        pushHistory();
        navigateChoice(event.currentTarget, () => {
          state.screen = isSettings ? "device" : "settings";
          state.lookupSource = isSettings ? "device" : "settings";
          state.feedback = null;
        }, isSettings ? "forward" : "backward");
      };
      const toBoxBtn = document.getElementById("toBoxFromLookup");
      if (toBoxBtn) {
        toBoxBtn.onclick = (event) => {
          pushHistory();
          navigateChoice(event.currentTarget, () => {
            state.screen = "box";
            state.lookupSource = "box";
            state.feedback = null;
          });
        };
      }
      document.getElementById("toVisualFromLookup").onclick = (event) => {
        pushHistory();
        navigateChoice(event.currentTarget, () => {
          state.screen = "visualIntro";
          state.feedback = null;
        });
      };
    }

    function doLookup() {
      const rawInput = String(state.lookupValue || "").trim();
      const normalized = normalizeANumber(rawInput);

      if (state.screen === "box") {
        let model = null;
        let aNumber = null;

        if (/^A\d{4}$/.test(normalized) && A_NUMBER_MAP[normalized]) {
          model = A_NUMBER_MAP[normalized];
          aNumber = normalized;
        } else {
          model = lookupModelByName(rawInput);
        }

        if (!model) {
          state.feedback = t("noNumberFound");
          showLoadingPulse();
          render("forward");
          return;
        }

        pushHistory();
        transitionTo(() => {
          state.result = {
            kind: "exact",
            aNumber,
            source: "box",
            models: [model],
            level: "exact"
          };
          state.screen = "result";
          state.feedback = null;
        }, "forward", { loader: true, delay: 170 });
        return;
      }

      if (!/^A\d{4}$/.test(normalized)) {
        state.feedback = t("noNumberFound");
        showLoadingPulse();
        render("forward");
        return;
      }
      const model = A_NUMBER_MAP[normalized];
      if (!model) {
        state.feedback = t("noNumberFound");
        showLoadingPulse();
        render("forward");
        return;
      }
      pushHistory();
      transitionTo(() => {
        state.result = {
          kind: "exact",
          aNumber: normalized,
          source: state.screen,
          models: [model],
          level: "exact"
        };
        state.screen = "result";
        state.feedback = null;
      }, "forward", { loader: true, delay: 170 });
    }

    function renderVisualIntro() {
      renderHints(["original_exterior", "sim_tray_lookup", "connector_lookup"]);
      screenEl.innerHTML = `
        <div class="eyebrow">${t("stepVisual")}</div>
        <h2 class="screen-title">${t("visualIntroTitle")}</h2>
        <p class="screen-subtitle">${t("visualIntroSubtitle")}</p>

        <div class="alert warning">
          <strong>${t("visualWarnTitle")}</strong><br>${t("visualWarnText")}
        </div>

        <div class="cta-box">
          <h3>${t("resultNextTitle")}</h3>
          <p>${t("resultNextExact")}</p>
        </div>

        <div class="actions-row">
          <button type="button" class="ghost-btn" id="backVisualIntro">${t("backBtn")}</button>
          <button type="button" class="secondary-btn" id="goExactFromVisual">${t("goSettings")}</button>
          <button type="button" class="cta" id="continueVisual">${t("visualContinue")}</button>
        </div>
      `;
      document.getElementById("backVisualIntro").onclick = restoreLast;
      document.getElementById("goExactFromVisual").onclick = (event) => {
        pushHistory();
        navigateChoice(event.currentTarget, () => {
          state.screen = "settings";
          state.lookupSource = "settings";
        }, "backward");
      };
      document.getElementById("continueVisual").onclick = (event) => {
        pushHistory();
        navigateChoice(event.currentTarget, () => {
          state.screen = "visualQuestion";
          state.nodeId = "originalExterior";
        });
      };
    }

    function answerNode(value, triggerEl = null) {
      const node = QUESTION_NODES[state.nodeId];
      if (!node) return;
      pushHistory();
      transitionTo(() => {
        state.answers[state.nodeId] = value;
        const nextNodeId = node.next[value];
        if (RESULT_NODES[nextNodeId]) {
          state.pendingResultId = nextNodeId;
          state.pendingModels = RESULT_NODES[nextNodeId].models.slice();
          state.selectedColorName = null;
          state.selectedColorNarrowed = false;
          if (canAskColorQuestion(nextNodeId)) {
            state.screen = "colorQuestion";
          } else {
            state.result = buildVisualResult(nextNodeId);
            state.screen = "result";
          }
          return;
        }
        state.nodeId = nextNodeId;
        state.screen = "visualQuestion";
      }, "forward", { triggerEl, loader: true, delay: 180 });
    }

    function buildVisualResult(resultId, overrideModels = null) {
      const raw = RESULT_NODES[resultId];
      const originalExterior = state.answers.originalExterior;
      const exactExterior = originalExterior === "yes";
      const models = overrideModels && overrideModels.length ? overrideModels : raw.models;
      const single = models.length === 1;
      const level = single ? "likely" : "family";
      return {
        kind: "visual",
        level,
        models,
        noteKey: raw.noteKey || null,
        titleKey: raw.titleKey || null,
        resultId,
        selectedColorName: state.selectedColorName || null,
        colorFiltered: !!state.selectedColorNarrowed
      };
    }


    function renderColorQuestion() {
      const resultId = state.pendingResultId;
      const models = (state.pendingModels && state.pendingModels.length ? state.pendingModels : (RESULT_NODES[resultId]?.models || [])).slice();
      const choices = getColorChoices(models);
      if (!resultId || !choices.length || !hasUsefulColorChoices(models)) {
        state.result = buildVisualResult(resultId, models);
        state.pendingResultId = null;
        state.pendingModels = null;
        state.screen = "result";
        render();
        return;
      }

      renderHints(["original_exterior"]);
      const subtitle = models.length === 1 ? t("colorFinalSubtitleSingle") : t("colorFinalSubtitleFamily");
      const optionsHtml = choices.map(choice => `
        <button type="button" class="color-option-btn" data-color-id="${choice.id}">
          <div class="color-option-top">
            ${colorIconHtml(choice)}
            <div>
              <strong>${displayColorName(choice.name)}</strong>
              <span>${t("continueBtn")}</span>
            </div>
          </div>
          <div class="color-option-models">${choice.models.join(" · ")}</div>
        </button>
      `).join("");

      screenEl.innerHTML = `
        <div class="eyebrow">${t("resultColorQuestionTitle")}</div>
        <h2 class="screen-title">${t("colorFinalTitle")}</h2>
        <p class="screen-subtitle">${subtitle}</p>
        <div class="alert warning"><strong>${t("resultColorQuestionTitle")}</strong><br>${t("resultColorQuestionText")}</div>
        <div class="color-question-grid">${optionsHtml}</div>
        <div class="color-question-footer">
          <button type="button" class="option-btn" id="skipColorBtn">
            <strong>${t("colorSkip")}</strong>
            <span>${t("continueBtn")}</span>
          </button>
        </div>
        <div class="tip-box" style="margin-top:16px;">
          <h3>${t("colorNarrowedTitle")}</h3>
          <p>${t("colorFinalFooter")}</p>
        </div>
        <div class="actions-row">
          <button type="button" class="ghost-btn" id="backColorQuestion">${t("backBtn")}</button>
          <button type="button" class="secondary-btn" id="needExactFromColor">${t("goSettings")}</button>
          <button type="button" class="secondary-btn" id="restartFromColor">${t("startOverBtn")}</button>
        </div>
      `;

      screenEl.querySelectorAll(".color-option-btn").forEach(btn => {
        btn.onclick = () => {
          const choice = choices.find(item => item.id === btn.dataset.colorId);
          if (!choice) return;
          navigateChoice(btn, () => {
            state.selectedColorName = choice.name;
            state.selectedColorNarrowed = choice.models.length < models.length;
            state.result = buildVisualResult(resultId, choice.models.slice());
            state.pendingResultId = null;
            state.pendingModels = null;
            state.screen = "result";
          });
        };
      });

      document.getElementById("skipColorBtn").onclick = (event) => {
        navigateChoice(event.currentTarget, () => {
          state.selectedColorName = null;
          state.selectedColorNarrowed = false;
          state.result = buildVisualResult(resultId, models);
          state.pendingResultId = null;
          state.pendingModels = null;
          state.screen = "result";
        });
      };
      document.getElementById("backColorQuestion").onclick = restoreLast;
      document.getElementById("needExactFromColor").onclick = (event) => {
        pushHistory();
        navigateChoice(event.currentTarget, () => {
          state.screen = "settings";
          state.pendingResultId = null;
          state.pendingModels = null;
        }, "backward");
      };
      document.getElementById("restartFromColor").onclick = resetApp;
    }

    function renderVisualQuestion() {
      const nodeId = state.nodeId;
      const node = QUESTION_NODES[nodeId];
      if (!node) {
        resetApp();
        return;
      }
      renderHints(node.hints || []);
      const optionsHtml = node.options.map((opt, index) => {
        return `
          <button type="button" class="option-btn" data-value="${opt.value}">
            ${optionImageHtml(nodeId, node, opt, index)}
          </button>
        `;
      }).join("");

      screenEl.innerHTML = `
        <div class="eyebrow">${t("stepVisual")}</div>
        <h2 class="screen-title">${t(node.titleKey)}</h2>
        <p class="screen-subtitle">${t("questionCommonSubtitle")}</p>
        <div class="alert warning" style="margin-bottom:16px;">${t("originalWarningShort")}</div>

        <div class="options-grid">${optionsHtml}</div>

        <div class="actions-row">
          <button type="button" class="ghost-btn" id="backQuestion">${t("backBtn")}</button>
          <button type="button" class="secondary-btn" id="needExactNow">${t("goSettings")}</button>
          <button type="button" class="secondary-btn" id="resetFromQuestion">${t("startOverBtn")}</button>
        </div>
      `;

      screenEl.querySelectorAll(".option-btn").forEach(btn => {
        btn.onclick = () => answerNode(btn.dataset.value, btn);
      });
      document.getElementById("backQuestion").onclick = restoreLast;
      document.getElementById("needExactNow").onclick = (event) => {
        pushHistory();
        navigateChoice(event.currentTarget, () => {
          state.screen = "settings";
        }, "backward");
      };
      document.getElementById("resetFromQuestion").onclick = resetApp;
    }

    function getAnswerSummary() {
      const items = [];
      Object.entries(state.answers).forEach(([id, value]) => {
        const node = QUESTION_NODES[id];
        if (!node) return;
        const option = node.options.find(opt => opt.value === value);
        if (!option) return;
        items.push(`<li><strong>${t(node.titleKey)}</strong>: ${t(option.labelKey)}</li>`);
      });
      if (state.selectedColorName) {
        items.push(`<li><strong>${t("colorSelectedLabel")}</strong>: ${displayColorName(state.selectedColorName)}</li>`);
      }
      return items.length ? items.join("") : `<li>${t("summaryUnknown")}</li>`;
    }

    function renderResult() {
      const result = state.result;
      if (!result) {
        resetApp();
        return;
      }
      const models = result.models || [];
      const isExact = result.kind === "exact";
      const chipLabel = isExact ? t("exactLabel") : (result.level === "likely" ? t("likelyLabel") : t("familyLabel"));
      const chipClass = isExact ? "exact" : (result.level === "likely" ? "likely" : "family");
      const heading = isExact ? t("exactResultTitle") : t("visualResultTitle");
      const mainModelHtml = models.length === 0 && result.titleKey
        ? `<h2 class="model-name">${t(result.titleKey)}</h2>`
        : models.length === 1
          ? `<h2 class="model-name">${models[0]}</h2>`
          : `<h2 class="model-name">${t("resultModelFamilyTitle")}</h2><div class="result-grid">${models.map(m => `<div class="result-box"><h3>${m}</h3></div>`).join("")}</div>`;
      const topNote = isExact
        ? (result.aNumber
            ? `<div class="alert success">${t("exactResultText")}<br><span class="muted">${t("resultsNoteExact")} · <span class="inline-code">${result.aNumber}</span></span></div>`
            : `<div class="alert success">${t("exactResultByNameText")}</div>`)
        : result.level === "likely"
          ? `<div class="alert warning">${t("visualWarnText")}</div>`
          : `<div class="alert danger">${t("resultNextExact")}</div>`;

      const optionalExteriorAlert = (!isExact && state.answers.originalExterior && state.answers.originalExterior !== "yes")
        ? `<div class="alert warning">${t("cautionExterior")}</div>`
        : "";
      const colorAlert = result.selectedColorName ? `
        <div class="alert ${result.colorFiltered && result.models.length === 1 ? "success" : "warning"}">
          <strong>${t("colorSelectedLabel")}: ${displayColorName(result.selectedColorName)}</strong><br>
          ${result.colorFiltered && result.models.length === 1 ? t("resultColorFilterExact") : t("resultColorFilterFamily")}
        </div>
      ` : "";
      const optionalNote = result.noteKey ? `<div class="tip-box"><h3>${t("startTipTitle")}</h3><p>${t(result.noteKey)}</p></div>` : "";

      renderHints(isExact ? (state.lookupSource === "box" ? ["box_receipt", "retail_label"] : [state.lookupSource === "device" ? "sim_tray_lookup" : "settings_about", state.lookupSource === "device" ? "connector_lookup" : "settings_model_tap"]) : ["settings_about", "sim_tray_lookup", "connector_lookup"]);
      screenEl.innerHTML = `
        <div class="eyebrow">${heading}</div>
        <span class="result-chip ${chipClass}">${chipLabel}</span>
        ${mainModelHtml}
        ${topNote}
        ${optionalExteriorAlert}
        ${colorAlert}

        <div class="result-grid">
          <div class="summary-card">
            <h3>${t("resultWhyTitle")}</h3>
            <ul class="summary-list">${isExact ? (
              result.source === "box" && !result.aNumber ? `
                <li>${t("exactReasonBox1")}</li>
                <li>${t("exactReasonBox2")}</li>
                <li>${t("exactReasonBox3")}</li>
              ` : `
                <li>${t("exactReason1")}</li>
                <li>${t("exactReason2")}</li>
                <li>${t("exactReason3")}</li>
              `
            ) : getAnswerSummary()}</ul>
          </div>
          <div class="summary-card">
            <h3>${isExact ? t("exactNextTitle") : t("resultNextTitle")}</h3>
            <ul class="summary-list">
              <li>${isExact ? t("exactNextText") : t("resultNextExact")}</li>
            </ul>
          </div>
        </div>

        ${colorHtmlForModels(models)}
        ${optionalNote}

        <div class="actions-row">
          <button type="button" class="ghost-btn" id="resultBackBtn">${t("resultBack")}</button>
          ${isExact ? "" : `<button type="button" class="secondary-btn" id="resultExactBtn">${t("resultGoExact")}</button>`}
          <button type="button" class="secondary-btn" id="resultLookupAnother">${t("lookupAnother")}</button>
          <button type="button" class="cta" id="resultRestartBtn">${t("resultRestart")}</button>
        </div>
      `;
      document.getElementById("resultBackBtn").onclick = restoreLast;
      const resultExactBtn = document.getElementById("resultExactBtn");
      if (resultExactBtn) {
        resultExactBtn.onclick = (event) => {
          pushHistory();
          navigateChoice(event.currentTarget, () => {
            state.screen = "settings";
            state.result = null;
          }, "backward");
        };
      }
      document.getElementById("resultLookupAnother").onclick = (event) => {
        pushHistory();
        navigateChoice(event.currentTarget, () => {
          state.screen = state.lookupSource === "device" ? "device" : "settings";
          state.result = null;
          state.lookupValue = "";
          state.feedback = null;
        }, "backward");
      };
      document.getElementById("resultRestartBtn").onclick = resetApp;
    }

    function render(direction = state.transitionDirection || "forward") {
      state.transitionDirection = direction;
      setTopText();
      updateTopChips();
      if (state.screen === "start") renderStart();
      else if (state.screen === "settings") renderLookup("settings");
      else if (state.screen === "device") renderLookup("device");
      else if (state.screen === "box") renderLookup("box");
      else if (state.screen === "visualIntro") renderVisualIntro();
      else if (state.screen === "visualQuestion") renderVisualQuestion();
      else if (state.screen === "colorQuestion") renderColorQuestion();
      else if (state.screen === "result") renderResult();
      else renderStart();
      enhanceRenderedScreen(direction);
      sendHeightToParent();
    }

    const parentOrigin = window.location.origin === "null" ? "*" : window.location.origin;
    let heightFrame = 0;

    function sendHeightToParent() {
      const shell = document.querySelector(".app-shell");
      const height = Math.ceil((shell?.getBoundingClientRect().height || 0) + 56);
      window.parent?.postMessage({ type: "iphone-model-quiz-height", height }, parentOrigin);
    }

    function scheduleHeightUpdate() {
      if (heightFrame) return;
      heightFrame = window.requestAnimationFrame(() => {
        heightFrame = 0;
        sendHeightToParent();
      });
    }

    window.addEventListener("resize", scheduleHeightUpdate, { passive: true });
    window.addEventListener("message", (event) => {
      if (parentOrigin !== "*" && event.origin !== parentOrigin) return;
      if (event.source !== window.parent) return;
      if (!event.data || event.data.type !== "hn-theme-change") return;
      const theme = event.data.theme === "light" || event.data.theme === "dark" ? event.data.theme : "";
      if (!theme) return;
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#f5f5f7" : "#071521");
    });

    const heightObserver = new ResizeObserver(scheduleHeightUpdate);
    heightObserver.observe(document.querySelector(".app-shell"));
    window.addEventListener("pagehide", () => {
      heightObserver.disconnect();
      if (heightFrame) window.cancelAnimationFrame(heightFrame);
    }, { once: true });
    render();
