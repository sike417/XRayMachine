// For NetBeans Syntax Highlight: http://plugins.netbeans.org/plugin/46515/glsl-syntax-highlighter 
//
// This is the vertex shader 
attribute vec3 aSquareVertexPosition;  // Vertex shader expects one vertex position
attribute vec4 aVertexColorValue;
attribute vec2 aTextureCoordinate;

// to transform the vertex position
uniform mat4 uModelTransform;
uniform mat4 uViewProjTransform;

uniform mat3 uTextureTransform[8];

// passing to fragment shader
varying vec4 vColorValue;
varying vec2 vTexCoord[8];

void main(void) {
    // Convert the vec3 into vec4 for scan conversion and
    // transform by uModelTransform and uViewProjTransform before
    // assign to gl_Position to pass the vertex to the fragment shader
    gl_Position = uViewProjTransform * uModelTransform * vec4(aSquareVertexPosition, 1.0); 

    vColorValue = aVertexColorValue;
    for (int i = 0; i<8; i++)
        vTexCoord[i] = (uTextureTransform[i] * vec3(aTextureCoordinate, 1)).xy;
}