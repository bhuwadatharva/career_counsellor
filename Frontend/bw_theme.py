import os

replacements = {
    "bg-blue-600": "bg-black",
    "hover:bg-blue-700": "hover:bg-gray-800",
    "text-blue-600": "text-black",
    "hover:text-blue-600": "hover:text-gray-600",
    "border-blue-600": "border-black",
    "bg-blue-50": "bg-gray-50",
    "text-blue-500": "text-gray-500",
    "border-blue-500": "border-gray-500",
    "text-blue-800": "text-black",
    "bg-blue-100": "bg-gray-100",
    "border-blue-300": "border-gray-300",
    "bg-blue-400": "bg-gray-400",
    
    "bg-yellow-400": "bg-white",
    "hover:bg-yellow-500": "hover:bg-gray-100",
    "text-yellow-800": "text-black",
    "bg-yellow-100": "bg-gray-100",
    "border-yellow-300": "border-gray-300",
    
    "bg-red-600": "bg-black",
    "text-red-500": "text-gray-600",
    "text-red-800": "text-black",
    "bg-red-100": "bg-gray-100",
    "border-red-300": "border-gray-300",

    "bg-green-600": "bg-black",
    "text-green-600": "text-black",
    "text-green-700": "text-black",

    "bg-purple-600": "bg-black",
    "text-indigo-500": "text-gray-600",

    "bg-indigo-100": "bg-gray-100",
    "text-indigo-600": "text-black",
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
