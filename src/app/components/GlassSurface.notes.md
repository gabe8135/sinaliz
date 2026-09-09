# Liquid glass aprovado

Componente React Bits instalado pelo registry `@react-bits/GlassSurface-JS-CSS`.
Guardado para uso futuro; não está aplicado ao portfólio.
Arquivos: GlassSurface.jsx e GlassSurface.css. Não exige dependências adicionais.

```jsx
import GlassSurface from './GlassSurface';

<GlassSurface
  width="100%"
  height="auto"
  borderRadius={50}
  displace={0.5}
  distortionScale={-180}
  redOffset={0}
  greenOffset={10}
  blueOffset={20}
  brightness={50}
  opacity={0.93}
  mixBlendMode="screen"
>
  {children}
</GlassSurface>
```

Preservar o fundo transparente: camadas opacas encobrem a refração.
Usar `color-scheme` apropriado ao fundo para os reflexos.
Para conteúdo de altura automática, ajustar `.glass-surface__content` para
`height: auto; display: block; padding: 0` com uma classe específica da integração.
