import os

replacements = {
    # Backgrounds
    "bg-white": "bg-black",
    "bg-[#f7f7f7]": "bg-[#0a0a0a]",
    "bg-[#fefefe]": "bg-[#111]",
    "bg-[#eff3f6]": "bg-[#050505]",
    "bg-gray-50": "bg-[#111]",
    "bg-gray-100": "bg-[#1a1a1a]",
    
    # Text colors
    "text-black": "text-white",
    "text-gray-900": "text-gray-100",
    "text-gray-800": "text-gray-200",
    "text-gray-700": "text-gray-300",
    "text-gray-600": "text-gray-400",
    "text-[#1a1a1a]": "text-[#f5f5f5]",

    # Border colors
    "border-black": "border-neutral-800",
    "border-gray-200": "border-[#333]",
    "border-gray-300": "border-[#444]",
    
    # Specific styling overrides mapped to dark theme
    "bg-[#0a0a0a] hover:bg-[#fafafa]": "bg-[#ffffff] hover:bg-[#1a1a1a]",
    "background: var(--db-bg);": "background: #000;",
    "color: var(--db-fg);": "color: #fff;",
    "--db-bg: #fafafa;": "--db-bg: #000000;",
    "--db-fg: #0a0a0a;": "--db-fg: #ffffff;",
    "--db-border: #e0e0e0;": "--db-border: #333333;",
    "--db-tag-bg: #f0f0f0;": "--db-tag-bg: #222222;",

    # Gradients in recently added Test.jsx
    "linear-gradient(135deg,#fff8f6 0%,#fff 100%)": "linear-gradient(135deg,#111 0%,#000 100%)",
    "background: \"#f9fafb\"": "background: \"#1a1a1a\"",
    "border: \"1px solid #e5e7eb\"": "border: \"1px solid #333\"",
    "color: \"#111827\"": "color: \"#fff\"",
}

directory = r"d:\Website\career_counsellor\Frontend\src"

for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith((".jsx", ".js", ".css")):
            filepath = os.path.join(root, file)
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()

            new_content = content
            for old, new in replacements.items():
                new_content = new_content.replace(old, new)
                
            if content != new_content:
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"Updated {filepath}")
