# AI PROMPTS - RELICS OF ECHO
## Production-Ready AI Art Generation Guidelines

### **Master Prompt Structure**
```
Master prompt: [Game asset type], [art style], [character/story context], [specific requirements]
```

### **Style Constraints**
- **Pixel Art Style**: Crisp edges, 2x2 pixels per unit, limited color palette
- **Character Proportions**: Consistent anatomy across all archetypes
- **Color Psychology**: Thematic color schemes per archetype
- **Lighting Consistency**: Same light source direction and intensity
- **Animation Flow**: Logical movement transitions and timing
- **Texture Quality**: Distinct materials (metal, cloth, wood, magic)

### **Color Palette Guidance**

#### **Explorer Archetype**
- Primary: Forest green (#2d5016), brown (#5d4e37), cream (#f0e68c)
- Secondary: Blue (#3b82a4), orange (#d97706)
- Accent: Gold (#fbbf24), silver (#a3a3a3)

#### **Swordsman Archetype**
- Primary: Steel gray (#4b5563), black (#1f2937), white (#f9fafb)
- Secondary: Blood red (#dc2626), brass (#b45309)
- Accent: Gold (#fbbf24), crimson (#dc2626)

#### **Tank Archetype**
- Primary: Deep purple (#6b21a8), black (#000000), dark blue (#1e3a8a)
- Secondary: Silver (#d4d4d8), bronze (#cd9b1d)
- Accent: Gold (#fbbf24), crimson (#dc2626)

#### **Assassin Archetype**
- Primary: Midnight black (#000000), crimson (#dc2626), dark green (#065f46)
- Secondary: Shadow gray (#374151), jade (#34d399)
- Accent: Gold (#fbbf24), silver (#a3a3a3)

#### **Mage Archetype**
- Primary: Deep blue (#1e40af), violet (#7c3aed), light blue (#93c5fd)
- Secondary: White (#f9fafb), gold (#fbbf24)
- Accent: Sky blue (#0ea5e9), magenta (#d946ef)

#### **Necromancer Archetype**
- Primary: Dark purple (#581c87), black (#000000), bone white (#f5f5f4)
- Secondary: Shadow gray (#374151), crimson (#dc2626)
- Accent: Green (#22c55e), gold (#fbbf24), silver (#a3a3a3)

### **Negative Prompt Guidance**
- **Unwanted Artifacts**: Glitches, distortion, compression artifacts
- **Inconsistent Style**: Mixed art styles, anime-style characters
- **Out of Context**: Modern clothing, realistic textures
- **Color Issues**: Oversaturated colors, color bleeding
- **Quality Issues**: Low resolution, blurry edges, inconsistent lighting
- **Context Violations**: Wrong character proportions, missing equipment

### **Consistency Rules**

#### **Character Appearance**
- All characters must maintain same body proportions regardless of archetype
- Equipment should reflect class abilities (e.g., mages with staffs)
- Consistent hair styles within archetype families
- Same animation timing and transition logic
- Identical UI icon styles for each class

#### **Environmental Consistency**
- Same tileset style across all environments
- Consistent ruin architecture and design language
- Uniform portal visual effects and behavior
- Matching particle effect styles across all skills

#### **Lighting and Atmosphere**
- Consistent color grading across all scenes
- Same shadow intensity and direction
- Uniform atmospheric effects (fog, mist, glow)
- Consistent post-processing effects

### **Category-Specific Prompts**

#### **Character Portraits**
```
[Character name], [archetype] portrait, pixel art, profile view, studio lighting, clean background, professional character design, [specific class traits], detailed facial features, consistent with art direction, game character art
```

#### **Environment Tiles**
```
[Environment type] tileset, pixel art, isometric view, 32x32 pixels, forest/cavern/ruins theme, consistent with game world, clean edges, [color palette], professional level design
```

#### **Skill Icons**
```
[Ability name], [archetype] skill icon, pixel art, centered composition, 64x64 pixels, [archetype color scheme], clear visual metaphor, game UI element, professional design
```

#### **Effect Animations**
```
[Effect name] particle effect, pixel art, 30fps animation, [archetype colors], consistent with other effects, professional special effects, game quality standard
```

#### **UI Elements**
```
[UI element name], pixel art interface, 2D game UI, [color palette], clean and functional, game user experience design, consistent with game branding
```

### **Quality Control Rules**
1. **Review Checklist**: Each asset against master style guide
2. **Color Validation**: Hex codes match archetype palette
3. **Size Compliance**: Exact pixel dimensions per specification
4. **Animation Testing**: Smooth transitions and timing
5. **Integration Testing**: Works correctly in game engine
6. **Consistency Audits**: Regular style reviews across all assets

### **Production Workflow**
1. **Initial Generation**: AI prompt execution with style constraints
2. **Quality Review**: Manual inspection against guidelines
3. **Iterative Refinement**: Multiple versions until perfect match
4. **Final Approval**: Sign-off by art director
5. **Integration**: Implementation into game build
6. **Documentation**: Asset metadata and usage guidelines