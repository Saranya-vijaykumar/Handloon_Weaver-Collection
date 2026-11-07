/**
 * Handloom Weavers Collective - Master Catalog & Artisan Data
 * Synchronized with Home 1 Heirloom Catalog, User Screenshots & Individual Artisan Profiles
 */

const HWC_ARTISANS = [
  {
    id: "art-1",
    name: "Pandit Ramkishan",
    cluster: "Varanasi Cluster",
    experience: "42 Years on Wooden Pit Looms",
    craft: "Kadwa Brocade & Pure Zari Weaving",
    verified: true,
    bio: "Pandit Ramkishan began weaving at age 12 beside his grandfather in the sacred lanes of Madanpura, Varanasi. He specializes in the endangered 'Kadwa' technique where each gold motif is woven individually without loose floats on the reverse. Through our collective, his entire family cooperative receives direct living wages with zero middlemen cuts.",
    quote: "When the shuttle passes through the silk warp, it carries not just thread, but 600 years of songs and silence.",
    audioTitle: "Rhythm of the Varanasi Pit Loom",
    audioDuration: "03:42",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5UZzwyLuOjGQNdoW03UKrgc2K0ULAw5Ry2J535Bp6m8Xu6KVCXTplcIPaQvT9eBQc4RJgOPH7It4pj11-cTrIrlpjZeqe5v56HbhKiNCA3RF1Egtwm5wS8GJLwQqtK-67QF0FbkrbVt1Cue2UDMfzt42LGz0PrMz3-PgwTgKUyh_M7Wh6bDc4_JMZGDcvBXZRuT1hyoDXWbIL-wXRFtAixzdF9o_Uz_gXHbohE2I"
  },
  {
    id: "art-2",
    name: "Ustad Rahim Ansari",
    cluster: "Varanasi Cluster",
    experience: "38 Years Experience",
    craft: "Antique Zari & Kinkhab Brocade",
    verified: true,
    bio: "Ustad Rahim Ansari is a revered 4th-generation master of Kinkhab heavy brocade in Varanasi. Working with pure silver-gilded zari and rich jewel mulberry silk, his family atelier creates museum-grade heirlooms designed to last for generations.",
    quote: "Every throw of the wooden shuttle is an act of devotion to our ancestors' patience.",
    audioTitle: "Echoes of the Sacred Ghat Pit Looms",
    audioDuration: "03:15",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNaRkntKjLDi66O_29vUJcVUN6Wgc-WsXSjnwSF5eY0Z24fzSH_hD0HUe5ddbhySc3HJVbwYr70sNG6J--TKLIgVWB7HE4P59fVp1R8zVIuksuefyV-KQJkKlWCd4qhqAOKW5bxdBsUsX_rnXqJs-rTGTAxqOfrQvhqzYIa4mMhi7Lfsm3wuLp4iu9tjFu1XU0MxfI-4ZjdGdmxnQQ5eh_li-UeZXXGd3Lx_VFnj4"
  },
  {
    id: "art-3",
    name: "Padmavati Devi",
    cluster: "Bengal Cluster",
    experience: "30 Years Experience",
    craft: "Ancestral Kantha Stitch & Indigo Dyeing",
    verified: true,
    bio: "Padmavati Devi leads an all-women artisan cooperative in rural Bengal. She transforms handspun khadi cotton saris with layered multicoloured Kantha embroidery, breathing new life into folk folklore motifs passed down by grandmothers.",
    quote: "Our needlework carries the stories of Bengal's rivers, monsoon clouds, and rural village songs.",
    audioTitle: "The Village Veranda Stitching Songs",
    audioDuration: "02:40",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjWGGruPse6kQKyUFj1a4CZqcvqmL1rtE9JRTjtvB3PPfVpcxJPtEc0XsRqt5gvLV7KVV6MITPvEp_QdU8UF6pAnb_PGJe065zW9YVsEvO1NPIjW6UFKSujVDGXB9n0jWD1dCDe29cBtbAaEsgAym6wRu2fWiBl2HXFRrXqKJxR34cvdEnJJjWpdjr3UEE6rLuIVQQu-x1FqgdrGvKNTjn3VWCg-fVZrT66c6KsEU"
  },
  {
    id: "art-4",
    name: "Ghulam Hassan Mir",
    cluster: "Kashmir Cluster",
    experience: "42 Years Master Artisan",
    craft: "Sozni Needlework & Hand-Combed Pashmina",
    verified: true,
    bio: "Ghulam Hassan works from a quiet wooden workshop in Srinagar. He combs raw Changthangi Cashmere wool by hand and performs miniature single-needle Sozni embroidery that takes up to four months to complete a single heirloom stole.",
    quote: "Pashmina is not merely fabric—it is the warm breath of the roof of the world.",
    audioTitle: "The Snow Wind of Changthang Plateau",
    audioDuration: "04:10",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4bp9B0QuMP8C3mJEjusyVk7Q0P9ttc8NyXx8Nq4M4RG9fJlhuxFMMYr8TN3eHoRyOR1x7qRTzpWMGIco6EmaihLTFGW82SmlLDI14Rbi4QsE61R69Csn7-4a6ksH0noQJxRNpR8TGqS8mD7lr1RWj1urVUkiKWTclKHaacqMQndNrKQR0qgqA8viocy5cwts2V0qgy5R4naplPPOMo2JSlFnpWbsDRfQs4y9sH0Q"
  },
  {
    id: "art-5",
    name: "Mallesh Goud",
    cluster: "Telangana Cluster",
    experience: "35 Years Master Weaver",
    craft: "Double Ikat Geometric Silk (Tie & Dye)",
    verified: true,
    bio: "Mallesh Goud is a mathematical genius on the loom, calculating intricate double-ikat warp and weft alignments without paper templates. Every dyed motif matches down to the millimeter during the rhythmic pit loom weaving process.",
    quote: "Every thread is counted in my mind long before it touches the natural indigo or madder dye pot.",
    audioTitle: "The Loom Mathematics of Telangana",
    audioDuration: "02:50",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxx0XPd1K-OT1wy0nAUMJ7MCtcW9fOgEZYurnDw391mwAmURdRg9EDHeKPbRCED0HHe6lFIFEye0wqBEYZ7dIWli0LbgX6usFy0HksQx-0ob7w-nFOAAhqbGto5O4lRDnIuHERfXxMJQY3LjpYflpaHUtdSHm0yf2RBuaTt--mHdG5WgEJpB8XfIcrRKChi2rmlyWFCHWHFby0pVy1RR47AlbO3TNft7tfVEt3cxk"
  },
  {
    id: "art-6",
    name: "Kamala Devi",
    cluster: "Varanasi / Maheshwar Cluster",
    experience: "28 Years Experience",
    craft: "Tissue Organza Silk & Reversible Borders",
    verified: true,
    bio: "Kamala Devi weaves gossamer-light tissue organza silks with delicate real gold wire inlay. Her reversible border patterns draw inspiration from ancient temple carvings and the sacred stone ghats of central India.",
    quote: "Our borders reflect the sacred stone carvings that have stood unbroken through the centuries.",
    audioTitle: "Whispers of the Golden Wire Warp",
    audioDuration: "03:10",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUBCqZBMqIGrE9WOurzWTnoivbx8p3l_EwD09Ce84lKsqrUQLsGAmmOCIbyxvbsx80NnOIcYNm8pWzHuEMk_C2Z_gcb2RLDT1hr0FeopBNwKUILEa9VwGVrPYOTaDof_K5Z0VR4jBEIKVu9BrVdmmkk6T1XJgp3RqKpvgF5-cp_wFwR_yxKs8QQ9or68NW3Kg7yNUNrLMLpbN6hmsh_zwVfq9Ul0oQJh214q9SHN0"
  },
  {
    id: "art-7",
    name: "Ananya Das",
    cluster: "Bengal Cluster",
    experience: "32 Years Muslin Jamdani Weaver",
    craft: "Fine Muslin Jamdani & Discontinuous Weft",
    verified: true,
    bio: "Ananya Das is a living master of 300-count handspun cotton Jamdani in Fulia, creating geometric floral motifs that float effortlessly across translucent drapes without any computer assistance.",
    quote: "True Jamdani cannot be hurried. It grows as slowly and gracefully as morning mist over the river.",
    audioTitle: "Morning Mist on Bengal Pit Looms",
    audioDuration: "03:30",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCG70nVFx6fNK_PWWOtlhrQEv1025moEZgs33IVDQ1TC755WOOOKW2OgBtXRsaRWj6JTWgjBq_uzNvmeX3bMOgTrmY_OCw2srDPaHjJu4muM5IRNvwvrndSvoJx4yX83ABoCrTDhoclPe5eehrb-6hQ73KRXWc2C7B-STZNRV9OvrHM-GNDrBJDklIECqJQ4bH6vMz3tKc4Jw6VrDYN3n0iWKIihuO1sfP_vfqFhfc"
  }
];

const HWC_PRODUCTS = [
  {
    id: "prod-1",
    title: "Mayur-Bahar Gold Brocade Saree",
    category: "silk",
    fabric: "Certified Mulberry Silk & 24K Gold Zari",
    technique: "Varanasi Kadwa Pit-Loom Weave",
    price: 48000,
    priceFormatted: "₹48,000",
    usdPrice: "$225",
    badge: "Varanasi Silk",
    daysToWeave: 120,
    artisan: {
      id: "art-1",
      name: "Pandit Ramkishan",
      cluster: "Varanasi Cluster",
      lineage: "5th Generation Master Pit Loom Weaver",
      photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5UZzwyLuOjGQNdoW03UKrgc2K0ULAw5Ry2J535Bp6m8Xu6KVCXTplcIPaQvT9eBQc4RJgOPH7It4pj11-cTrIrlpjZeqe5v56HbhKiNCA3RF1Egtwm5wS8GJLwQqtK-67QF0FbkrbVt1Cue2UDMfzt42LGz0PrMz3-PgwTgKUyh_M7Wh6bDc4_JMZGDcvBXZRuT1hyoDXWbIL-wXRFtAixzdF9o_Uz_gXHbohE2I",
      bio: "Pandit Ramkishan has spent over four decades seated at the sunken pit loom in his ancestral home in Varanasi. Taught by his father at age twelve, he preserves rare brocade techniques that take upwards of 120 hours per masterpiece.",
      quote: "When the shuttle passes through the silk warp, it carries not just thread, but 600 years of songs and silence."
    },
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCgr58X6x7XcFpoKKmy3CWnIrAMB8JAGhxWfRg_Yyk6hivah4LqJ9k1K7HeP-hKyKrIHY5A6UP4d-clLwuJtqkZilctgF6deHELOD1XLXVdft2T90-jmwkgu4kNR4IvN4jY5JNpTWv7Uv7RaWMSeMOB85jWiS55fplyakV7uCzWpZBYkzP3F9UnJ_tMp82e0en6PNSuhZlmwXjdhg2MS8UFcdNC-c-TB8qJud2cM8I",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA9mcnz3xG4qtz0O8vS9esjNL_3O815pSiEoIIA7XXnYP99JP_8yaIIeBjTQ1tgkTuVq1Nt6kK18cBfMo-Q2I5Cc3ta901woi8Ec75eCcn9y13TCFbUG6L44-Zt5QQY1ddR2Gsa5gpllyrcr7dMFCpC2WvB0gjP4y4RE-wcyGABRDGKkcX_LrrttN1nnpSBKc8ettuYXWzv3ReC0KCz1Ho9pvbEj476Z8iADd7FHjM",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC56zQgx_k_YnGYRTw5tObhbJmXNFmqZHhj8Iy3b9vpQrdc9XgiaJB07AtTuY8H6Ffqyt4NDa0MddxDGZ5KPr-9FiBsGxpu83YDkXFpmbR6dEJPkCKj77LpETKgTJOHCV5NUN8Z4tZ7M6IB62y4pvt5Hi7ZSVWdxP1gaWQoWwcj38zYLbrqAnFTb0QoYv923ww6BK8Px4gTa4PoIb1TFTq2HuZ9qNfmwZfGrUhhZjM"
    ],
    description: "An opulent crimson Kanjeevaram and Varanasi heritage silk saree featuring intricate pure gold zari brocade peacocks and floral vine motifs along the rich pallu. Woven over 120 days using certified mulberry silk and genuine 24-karat gold electroplated silver zari on a sunken wooden pit loom.",
    specs: {
      length: "5.5 meters saree + 0.8 meter unstitched blouse piece",
      width: "46 inches",
      weight: "820 grams",
      certification: "Silk Mark & Craftmark GI-Registered Handloom",
      care: "Dry clean only in muslin wrap. Store away from direct sunlight."
    }
  },
  {
    id: "prod-2",
    title: "Meghdoot Handspun Jamdani",
    category: "cotton",
    fabric: "Superfine Handspun Khadi Muslin Cotton",
    technique: "Discontinuous Weft Supplementary Motifs",
    price: 28000,
    priceFormatted: "₹28,000",
    usdPrice: "$175",
    badge: "Bengal Jamdani",
    daysToWeave: 85,
    artisan: {
      id: "art-7",
      name: "Ananya Das",
      cluster: "Bengal Cluster",
      lineage: "Traditional Fulia Jamdani Guild Master",
      photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCG70nVFx6fNK_PWWOtlhrQEv1025moEZgs33IVDQ1TC755WOOOKW2OgBtXRsaRWj6JTWgjBq_uzNvmeX3bMOgTrmY_OCw2srDPaHjJu4muM5IRNvwvrndSvoJx4yX83ABoCrTDhoclPe5eehrb-6hQ73KRXWc2C7B-STZNRV9OvrHM-GNDrBJDklIECqJQ4bH6vMz3tKc4Jw6VrDYN3n0iWKIihuO1sfP_vfqFhfc",
      bio: "Ananya Das is a living master of 300-count handspun cotton Jamdani in Fulia, creating geometric floral motifs that float effortlessly across translucent drapes without any computer assistance.",
      quote: "True Jamdani cannot be hurried. It grows as slowly and gracefully as morning mist over the river."
    },
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-M7ZnEiUCUIZ-IBRtQxgiEdhxrmuvU8K1_4Qr-ktYxfucYjLquUhbN0iG2le9aNWoKmkjnbWNs3Mb9ip_3TJw93gEu43cJ4qqNaEKRJODm7ji3L_4TROhiDF7klFHCYIMhNS6LiNNZRZly0e5Tc6xjYdKDzepYZZ_EB_ZmfturFQ3jlXC6YEUSHQiE7zPgS-NIMuXEtqSY790kjI0_4V0LxVPIvnn-0ZmEPWElGo",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAG6f2BKKilUKVNwVK5GSSq_NVUBI6CsEsT6Mlb-CLyKKzsGDEFThl5tmHSd3_qhWx6dvnfrnl7x_snN_kHRbFZhU0kSkxLH19lD9YS0YACAHMAJXQBheEreukn4fyQdzokyaJYxpb_THZCJODyxf9Vee5eOQd3bNJI6cWuShtIxmnvIzlE2PA_s43Q8J_lrIidzo8nCYJag2LHrvaHhak7crZyq7x7g09eg4upiHk"
    ],
    description: "Exquisitely hand-inserted supplementary weft motifs on ultra-fine khadi cotton spun to ethereal sheer lightness. Feathery floral motifs float across unbleached ivory muslin, woven rhythmically with double shuttles on village frame looms.",
    specs: {
      length: "6.2 meters with matching blouse",
      width: "46 inches",
      weight: "310 grams",
      certification: "GI Tag Certified Bengal Muslin",
      care: "Gentle cold handwash with mild organic soap."
    }
  },
  {
    id: "prod-3",
    title: "Chinar Leaf Hand-Embroidered Pashmina",
    category: "wool",
    fabric: "100% Grade-A Changthangi Cashmere",
    technique: "Sozni Miniature Needle Embroidery",
    price: 65000,
    priceFormatted: "₹65,000",
    usdPrice: "$290",
    badge: "Kashmir Pashmina",
    daysToWeave: 95,
    artisan: {
      id: "art-4",
      name: "Ghulam Hassan Mir",
      cluster: "Kashmir Cluster",
      lineage: "4th Generation Sozni Needlework Master",
      photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4bp9B0QuMP8C3mJEjusyVk7Q0P9ttc8NyXx8Nq4M4RG9fJlhuxFMMYr8TN3eHoRyOR1x7qRTzpWMGIco6EmaihLTFGW82SmlLDI14Rbi4QsE61R69Csn7-4a6ksH0noQJxRNpR8TGqS8mD7lr1RWj1urVUkiKWTclKHaacqMQndNrKQR0qgqA8viocy5cwts2V0qgy5R4naplPPOMo2JSlFnpWbsDRfQs4y9sH0Q",
      bio: "Ghulam Hassan works from a quiet wooden workshop in Srinagar. He combs raw Changthangi Cashmere wool by hand and performs miniature single-needle Sozni embroidery that takes up to four months per stole.",
      quote: "Pashmina is not merely fabric—it is the warm breath of the roof of the world."
    },
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB0Q9CBWxPE7t61Gg1bSE-CVEGx3V06-Q8ZtJoreEFnPiVaEJyjrytqDpwVMcGWViNXYXY1tB2B2wj1mBesMTg_HX7VO-pWYfkr0uWzYvCXumomo7o80vDiipw_AZgkKa_usDzIbMpZA5IbpQT__Gd9NvvGh6UAS7uOWozEGGU7VlxbNykOlhhNSeK3WuZUbGUpj6R5hSIiDUtkaV1XtR53KkHYzryapKcyC1TpBzc",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBdKROl1dRysAJVqyRGK-iTlLAkwLhcNjYZPKfmlW5-kNG9dqiGXyoZ20JaTjoWZvTvgLxaBwPaJkjomhWW7KtSAZiF9BU-YNKIABeOvzMrJPsBWsXNRSlK-Tqe_ZogF-71HLSC73J9kaHGg5d09-2MpmhdgtlQJvThVEVJFV3JARaqi8bRn14N9kaR22exKi7tz9C9JH5WJOHrIKhIrZuWo4nes53T9XwolPlbOA"
    ],
    description: "Hand-combed grade-A Cashmere wool adorned with painstaking Sozni needlework in subtle earthy tones of walnut, olive, and terracotta. Spun from high-altitude Changthangi fleece on traditional wooden spindles for weightless warmth.",
    specs: {
      length: "200 cm",
      width: "100 cm",
      weight: "185 grams",
      certification: "Geographical Indication (GI) Registered Cashmere",
      care: "Professional cashmere dry clean only."
    }
  },
  {
    id: "prod-4",
    title: "Kala Cotton Indigo Handspun Tunic",
    category: "cotton",
    fabric: "Rain-fed Indigenous Kala Cotton",
    technique: "Pit Loom Weave with Natural Indigo",
    price: 6800,
    priceFormatted: "₹6,800",
    usdPrice: "$85",
    badge: "Organic Cotton",
    daysToWeave: 24,
    artisan: {
      id: "art-5",
      name: "Mallesh Goud",
      cluster: "Telangana Cluster",
      lineage: "Vankar & Ikat Master Weaver",
      photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxx0XPd1K-OT1wy0nAUMJ7MCtcW9fOgEZYurnDw391mwAmURdRg9EDHeKPbRCED0HHe6lFIFEye0wqBEYZ7dIWli0LbgX6usFy0HksQx-0ob7w-nFOAAhqbGto5O4lRDnIuHERfXxMJQY3LjpYflpaHUtdSHm0yf2RBuaTt--mHdG5WgEJpB8XfIcrRKChi2rmlyWFCHWHFby0pVy1RR47AlbO3TNft7tfVEt3cxk",
      bio: "Mallesh Goud is a master of geometry and natural dye chemistry in Telangana. He calculates complex double-ikat tie-and-dye warp patterns in his mind, ensuring millimeter precision on every dyed yarn.",
      quote: "Every thread is counted in my mind long before it touches the natural indigo or madder dye pot."
    },
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBScwsMPTW9M_sONONV2jQMnRPq0kOtCPCZzGG7UJJu_IMwNcODxoMkU2HcAjXUlxBUWVdithvMt7k4vaNAUFVRVfvDrSWv82uU1CjKjo--VjeGb3CNHL1q-Jg0fP92IcB5smYhrKQwnAKjd5fqrOjqQ86NdkAu8g7gSJwo2E1EdmJxtEc0uAwK3Zt9dC3sceBS0T3KQYVkom1ahZMZ9D0-OBfLrknp-efQ9tS_pK4",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAQR9LU0iJtioovWfnC3VNE0Wlpnln59r4cUDSd5a86RRQvfZnosPqG-p8FMdv4pgf0wTo4UAfib0Acc1Ln6FQtlsQQXb4JoTyy7KZa72RiEsphHF_tNnG86NfDU6RxaGDUVgsV8BrhzcRv4eLhqe4akg6v00_dD1jphnECeLGhy9z2RsOB1EC7wXFKUoVRXuPMFHUOEh_5yu_2zlhLsBhMpRX9Wqd1T36ayj2dvGw"
    ],
    description: "Purely rain-fed, pesticide-free old-world cotton that breathes with natural organic resilience. Dyed using 100% plant-based organic indigo vats fermented with wild herbs in desert clay pots.",
    specs: {
      length: "Tailored artisan fit (S / M / L / XL available)",
      width: "Relaxed unisex drape",
      weight: "260 grams",
      certification: "GOTS & Fair Trade Certified Organics",
      care: "Hand wash separately in cold water with plant soap."
    }
  },
  {
    id: "prod-5",
    title: "Aura Pure Organic Linen Yardage",
    category: "linen",
    fabric: "100% Organic European Flax",
    technique: "Slow Loom Weave with Natural Tannins",
    price: 8900,
    priceFormatted: "₹8,900",
    usdPrice: "$110",
    badge: "Eco Flax Linen",
    daysToWeave: 28,
    artisan: {
      id: "art-6",
      name: "Kamala Devi",
      cluster: "Varanasi / Maheshwar Cluster",
      lineage: "Linen Guild Master Weaver",
      photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUBCqZBMqIGrE9WOurzWTnoivbx8p3l_EwD09Ce84lKsqrUQLsGAmmOCIbyxvbsx80NnOIcYNm8pWzHuEMk_C2Z_gcb2RLDT1hr0FeopBNwKUILEa9VwGVrPYOTaDof_K5Z0VR4jBEIKVu9BrVdmmkk6T1XJgp3RqKpvgF5-cp_wFwR_yxKs8QQ9or68NW3Kg7yNUNrLMLpbN6hmsh_zwVfq9Ul0oQJh214q9SHN0",
      bio: "Kamala Devi weaves gossamer-light tissue silks and fine handloom textiles. Her motifs draw inspiration from the sacred stone ghats and temple carvings of central India.",
      quote: "Our borders reflect the sacred stone carvings that have stood unbroken through the centuries."
    },
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB7PjXwPQHc2Gtjru5VYusLh47w9W0ulUpR3XEtrv1iTO9psWlIUr3WuS8b4pEn1GcWo9h9N-OqeJSn8jBXdPT2O2XWs5YuL82PhkMUu1W_PdfB_Rq19tnAsi72DulYtPSyLN3HslKENHtTrQxHZTtBnPuF1DP9lC-PizHQxeN8g4winHVfHi9956H8LRRbs6m9aln8UOIRFPkHEp-R2S8zB3iCmf9bRQuqkEMLrbI",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5eTGcZUSGjNUMDB2k_y5fJa6a_ZvlMVYi7lAe3d7HJoPIuXuiMLUyUeJ0ytPWhtO0BPY0BmVvOv4WhSSdRl4iBdOJD1piW3REKwX-N62RVV-MVuTgfhsMnjaEdVfUvCBi1eWsMJ5sqHVVVXJxMku5h3YV0P8g-SGpcBVLbwJdvReUrk4Gfk8F3_q74Jf-GD_DWtrsba737QwO-WcEoerfvJu-kHGtTCv3ngdvZrE"
    ],
    description: "Crisp, airy organic flax linen with a tactile slub texture. Pre-washed with natural river stone tumble for supreme tactile softness against summer skin.",
    specs: {
      length: "5.0 meters yardage length",
      width: "54 inches",
      weight: "440 grams",
      certification: "European Flax Standard & Fair Trade",
      care: "Machine washable on gentle cycle or hand rinse."
    }
  },
  {
    id: "prod-6",
    title: "Himalayan Nomadic Wool Throw",
    category: "wool",
    fabric: "High-Altitude Indigenous Sheep Wool",
    technique: "Floor Loom Weave with Raw Edge Fringes",
    price: 11500,
    priceFormatted: "₹11,500",
    usdPrice: "$140",
    badge: "Ladakh Wool",
    daysToWeave: 35,
    artisan: {
      id: "art-4",
      name: "Ghulam Hassan Mir",
      cluster: "Kashmir Cluster",
      lineage: "Nomadic Pastoralist & Wool Guild",
      photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4bp9B0QuMP8C3mJEjusyVk7Q0P9ttc8NyXx8Nq4M4RG9fJlhuxFMMYr8TN3eHoRyOR1x7qRTzpWMGIco6EmaihLTFGW82SmlLDI14Rbi4QsE61R69Csn7-4a6ksH0noQJxRNpR8TGqS8mD7lr1RWj1urVUkiKWTclKHaacqMQndNrKQR0qgqA8viocy5cwts2V0qgy5R4naplPPOMo2JSlFnpWbsDRfQs4y9sH0Q",
      bio: "Ghulam Hassan works from a quiet wooden workshop in Srinagar. He combs raw Changthangi wool by hand and performs master needlework on high-altitude fleece.",
      quote: "Pashmina is not merely fabric—it is the warm breath of the roof of the world."
    },
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB8nNPemv89JNXmpOS3-3O2c_t-Gu5nrMzNO3VNxCnvBpf2gCV0dOMbVIk_UYEFoGGTju_PAlXDtwTNPP-marT-Ns7-6ylm63Uhfoenv19sSaeKPxx9HaHzDAImxLRK_6NZAAz31cR83786I3mvL32Wsf09I2r3FlKpdsuPtxHbtl0dx7xBiEBEcniHH4Ax2peII2Nb6bkZw0up0CSNuxozs6QYIYbBfABZ47ETZVQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBdKROl1dRysAJVqyRGK-iTlLAkwLhcNjYZPKfmlW5-kNG9dqiGXyoZ20JaTjoWZvTvgLxaBwPaJkjomhWW7KtSAZiF9BU-YNKIABeOvzMrJPsBWsXNRSlK-Tqe_ZogF-71HLSC73J9kaHGg5d09-2MpmhdgtlQJvThVEVJFV3JARaqi8bRn14N9kaR22exKi7tz9C9JH5WJOHrIKhIrZuWo4nes53T9XwolPlbOA"
    ],
    description: "Thick, warm, and authentic nomadic wool blanket spun on traditional takli drop spindles by women pastoralists in Spiti Valley. Features raw undyed yarn tones in charcoal and oatmeal.",
    specs: {
      length: "220 cm",
      width: "150 cm",
      weight: "1100 grams",
      certification: "Himalayan Sustainable Fiber Initiative",
      care: "Spot clean or dry clean."
    }
  },
  {
    id: "prod-7",
    title: "Emerald Katan Silk Brocade Saree",
    category: "silk",
    fabric: "Mulberry Katan Silk with Real Zari",
    technique: "Varanasi Meenakari Brocade",
    price: 22000,
    priceFormatted: "₹22,000",
    usdPrice: "$265",
    badge: "Heritage Silk",
    daysToWeave: 90,
    artisan: {
      id: "art-1",
      name: "Pandit Ramkishan",
      cluster: "Varanasi Cluster",
      lineage: "Master Pit Loom Weaver",
      photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5UZzwyLuOjGQNdoW03UKrgc2K0ULAw5Ry2J535Bp6m8Xu6KVCXTplcIPaQvT9eBQc4RJgOPH7It4pj11-cTrIrlpjZeqe5v56HbhKiNCA3RF1Egtwm5wS8GJLwQqtK-67QF0FbkrbVt1Cue2UDMfzt42LGz0PrMz3-PgwTgKUyh_M7Wh6bDc4_JMZGDcvBXZRuT1hyoDXWbIL-wXRFtAixzdF9o_Uz_gXHbohE2I",
      bio: "Pandit Ramkishan has spent over four decades seated at the sunken pit loom in his ancestral home in Varanasi. Taught by his father at age twelve, he preserves rare brocade techniques that take upwards of 120 hours per masterpiece.",
      quote: "When the shuttle passes through the silk warp, it carries not just thread, but 600 years of songs and silence."
    },
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDvxPukrgYxO6kSZ_Q_bgLyIT-cni9yr6_ANgFwfd-OjOFYeCAufJTlg8wv716I27GYK-Yu0cyGK2Byd5_PgHAPrNdz0iIYwSxUKoyaEUHsLpCUVjMr4yXthlFXKa6Dy3fwcV6ZCtgxOmYqAg4iswRE4TGc_8njpFPRP0QZt0qRGHHFfb0jcNcsg1rh07gs-wybsGgr_g4Pwhr3uGLZU-O-NSS2tCYH_8xK53DxkO4",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCgr58X6x7XcFpoKKmy3CWnIrAMB8JAGhxWfRg_Yyk6hivah4LqJ9k1K7HeP-hKyKrIHY5A6UP4d-clLwuJtqkZilctgF6deHELOD1XLXVdft2T90-jmwkgu4kNR4IvN4jY5JNpTWv7Uv7RaWMSeMOB85jWiS55fplyakV7uCzWpZBYkzP3F9UnJ_tMp82e0en6PNSuhZlmwXjdhg2MS8UFcdNC-c-TB8qJud2cM8I"
    ],
    description: "Deep jewel-tone emerald green woven with delicate Persian-inspired floral vine borders and jewel-colored resham accents embedded seamlessly in metallic gold Zari.",
    specs: {
      length: "5.5 meters saree + 0.8 meter blouse",
      width: "45 inches",
      weight: "820 grams",
      certification: "Silk Mark Registered",
      care: "Dry clean only."
    }
  },
  {
    id: "prod-8",
    title: "Sapphire Royal Zari Dupatta",
    category: "silk",
    fabric: "Gossamer Chanderi Silk-Cotton",
    technique: "Ashavali Border Weave",
    price: 9500,
    priceFormatted: "₹9,500",
    usdPrice: "$115",
    badge: "Chanderi Silk",
    daysToWeave: 45,
    artisan: {
      id: "art-2",
      name: "Ustad Rahim Ansari",
      cluster: "Varanasi Cluster",
      lineage: "Royal Zari & Brocade Master",
      photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNaRkntKjLDi66O_29vUJcVUN6Wgc-WsXSjnwSF5eY0Z24fzSH_hD0HUe5ddbhySc3HJVbwYr70sNG6J--TKLIgVWB7HE4P59fVp1R8zVIuksuefyV-KQJkKlWCd4qhqAOKW5bxdBsUsX_rnXqJs-rTGTAxqOfrQvhqzYIa4mMhi7Lfsm3wuLp4iu9tjFu1XU0MxfI-4ZjdGdmxnQQ5eh_li-UeZXXGd3Lx_VFnj4",
      bio: "Ustad Rahim Ansari is a revered 4th-generation master of Kinkhab heavy brocade in Varanasi. Working with pure silver-gilded zari and rich jewel mulberry silk.",
      quote: "Every throw of the wooden shuttle is an act of devotion to our ancestors' patience."
    },
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAWX1DY1Nci1W7zs_fnNlQU85sxfX5NtxXSnid2Pt0r4Wgrkdr0ne8WGxO9fPU6k6aDuR3Y1_K6QSQYn52WsDDi9Wivc7xWBgXQhrRxTI3jjfCMLnpN6PIkRruqxtXVJwi4Q2dUaBwxHTpZa98PgTBN8S5828Y4AbfNg1VxCh7U-047rtoVYABm_nro30ytGdX1P1npesvgc5zXT7kN6LgP4IDNA240mt14o0Nitow",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-M7ZnEiUCUIZ-IBRtQxgiEdhxrmuvU8K1_4Qr-ktYxfucYjLquUhbN0iG2le9aNWoKmkjnbWNs3Mb9ip_3TJw93gEu43cJ4qqNaEKRJODm7ji3L_4TROhiDF7klFHCYIMhNS6LiNNZRZly0e5Tc6xjYdKDzepYZZ_EB_ZmfturFQ3jlXC6YEUSHQiE7zPgS-NIMuXEtqSY790kjI0_4V0LxVPIvnn-0ZmEPWElGo"
    ],
    description: "A translucent royal sapphire dupatta with shimmering gold bootis sprinkled across lightweight silk-cotton warp, finished with delicate scalloped gold fringes.",
    specs: {
      length: "2.5 meters",
      width: "36 inches",
      weight: "190 grams",
      certification: "Craftmark Certified",
      care: "Dry clean only."
    }
  }
];

if (typeof window !== 'undefined') {
  window.HWC_PRODUCTS = HWC_PRODUCTS;
  window.HWC_ARTISANS = HWC_ARTISANS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { HWC_PRODUCTS, HWC_ARTISANS };
}
