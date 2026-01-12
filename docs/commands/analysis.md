Analyze the Figma component and create a text file with the component specification BEFORE generating any code.

WORKFLOW (follow this order):
Use Figma MCP to get as much context as possible about the selected component:
Use tools like get_design_context and get_variable_defs (these names are examples, use whatever MCP tools are available to you).
Collect the layer tree structure, sizes, spacing, autolayout/layout grid, typography, colors, effects, variables, applied styles, etc.

Based on this, create a component specification in a separate file in the project, for example:
Path: component-specs/<component-name>.md (if the name is unknown, derive it from the Figma component name in kebab-case).
Add this file to the folder of the future component
Only AFTER creating the specification, you may start generating code.

SPECIFICATION FORMAT (required file structure):
Component name
Short description of the component’s purpose (1–2 sentences).

1. Structure
Hierarchy of inner elements (short outline: containers, layers, main blocks).
Key sizes and breakpoints (if they can be inferred from autolayouts/frames).
Layout (Auto Layout / Grid): direction, alignment, gap, padding, constraints.

2. Styles
List the key styles of the component:
Typography: fonts, sizes, weights, line-height, letter-spacing, Figma text styles.
Colors: main colors (background, text, borders, states), links to Figma variables/styles.
Borders and radii.
Shadows and other visual effects.
Write as a list, grouped by style type.

3. Component variants
Describe all variants/states you see in Figma:
List props/views like:
variant: size — [small | medium | large]
variant: state — [default | hover | pressed | disabled]
variant: theme — [light | dark]
For each variant, describe visual differences (changes in colors, icons, sizes, etc.).
If there are no variants, explicitly state that the component has no variants.

4. Behavior logic
Based on the component’s structure and variants, describe the expected behavior:
Interaction states: hover, active/pressed, focus, disabled, error, success, etc.
What happens on click, focus, hover (changes in color, shadow, border, cursor).
Rules for responsiveness (if they can be inferred from the design): how the component behaves when compressed/expanded.
Related elements (icons, labels, tooltips) and how they appear/disappear.

RULES:
ALWAYS create or update the specification file with the full structure above first.
If some data is not available from MCP, explicitly mark it as TODO in the specification and do not invent details.
Write in concise, technical language, with no fluff, in English.
Take the component name and variant names from Figma as the source of truth.