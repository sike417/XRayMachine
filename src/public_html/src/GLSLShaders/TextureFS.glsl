// this is the fragment (or pixel) shader that 
// outputs constant red color for every pixel rendered.

precision mediump float; 
    // sets the precision for floating point computation

// The object that fetches data from texture.
// Must be set outside the shader.
uniform sampler2D uSampler[8];
uniform int uNumTextures;

// Color of pixel
uniform vec4 uPixelColor;  
uniform bool uBlendColor;

// coming from Vertex Shader
varying vec4 vColorValue;
varying vec2 vTexCoord[8];

void main(void) {
    // now do texture lookup with the web-gl utility
    vec4 c = vec4(0.0);     // yeah for loop does not work here!
    if (uNumTextures > 0) 
        c += texture2D(uSampler[0], vTexCoord[0]);
    if (uNumTextures > 1) 
        c += texture2D(uSampler[1], vTexCoord[1]);
    if (uNumTextures > 2) 
        c += texture2D(uSampler[2], vTexCoord[2]);
    if (uNumTextures > 3) 
        c += texture2D(uSampler[3], vTexCoord[3]);
    if (uNumTextures > 4) 
        c += texture2D(uSampler[4], vTexCoord[4]);
    if (uNumTextures > 5) 
        c += texture2D(uSampler[5], vTexCoord[5]);
    if (uNumTextures > 6) 
        c += texture2D(uSampler[6], vTexCoord[6]);
    if (uNumTextures > 7) 
        c += texture2D(uSampler[7], vTexCoord[7]);
    
    // for every pixel called sets to the user specified color
    if (uBlendColor)
        gl_FragColor = vec4((c.rgb * (1.0-uPixelColor.a) + uPixelColor.rgb * uPixelColor.a), c.a);
    else
        gl_FragColor = c;
        
}