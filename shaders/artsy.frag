#version 330

// CSci-4611 Assignment 5:  Art Render

// TODO: You need to calculate per-fragment shading here using a toon shading model

in vec3 position_in_eye_space;
in vec3 normal_in_eye_space;

out vec4 color;

uniform vec3 light_in_eye_space;
uniform vec4 Ia, Id, Is;

uniform vec4 ka, kd, ks;
uniform float s;

uniform sampler2D diffuse_ramp;
uniform sampler2D specular_ramp;


void main() {

    vec3 n = normalize(normal_in_eye_space);

    vec3 l = normalize(light_in_eye_space - position_in_eye_space);

    vec3 e = normalize(vec3(0,0,0) - position_in_eye_space);

    vec3 h = normalize(l + e);

    vec4 ambient = ka * Ia;

    float diff_intensity = (dot(n, l) + 1) / 2;
    vec2 diffuse_texture = vec2(diff_intensity, 0);
    vec4 diffuse = kd * Id * texture(diffuse_ramp, diffuse_texture);

    float specular_intensity = pow(max(dot(h, n), 0), s);
    vec2 specular_texture = vec2(specular_intensity, 0);
    vec4 specular = ks * Is * texture(specular_ramp, specular_texture);

    color = ambient + diffuse + specular;
}
