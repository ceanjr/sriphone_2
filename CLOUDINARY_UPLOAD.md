# 📸 Guia de Upload - Cloudinary

Instruções rápidas para fazer upload das imagens do site legado para o Cloudinary.

## 🎯 Estrutura de Pastas no Cloudinary

Crie esta estrutura:
```
sriphone/
  └── landing/
      ├── logo-fundo.webp
      ├── barbudo.webp
      ├── arrow-down.svg
      └── insta.webp
```

## 📤 Passos para Upload

### 1. Acesse o Cloudinary
- Vá para: https://console.cloudinary.com/console/media_library
- Faça login com sua conta

### 2. Crie a pasta
- Clique em "Create folder" ou "Nova pasta"
- Nome: `sriphone`
- Dentro dela, crie: `landing`

### 3. Localize as imagens no site legado
As imagens devem estar em uma das seguintes localizações:
- `/legado/public/images/` (se existir)
- Servidor do site antigo
- Backup local

**Imagens necessárias:**
- ✅ `logo-fundo.webp` - Logo do site
- ✅ `Barbudo.webp` - Imagem principal do Hero (renomeie para minúscula)
- ✅ `insta.webp` - Ícone do Instagram
- ✅ `arrow-down.svg` - Seta animada

### 4. Faça o upload
1. Entre na pasta `sriphone/landing/`
2. Clique em "Upload" ou arraste as imagens
3. Certifique-se que os nomes estão corretos:
   - `logo-fundo.webp` (minúsculo, com hífen)
   - `barbudo.webp` (minúsculo)
   - `insta.webp` (minúsculo)
   - `arrow-down.svg` (minúsculo, com hífen)

### 5. Verifique a URL
Após upload, teste se funcionou:
```
https://res.cloudinary.com/SEU_CLOUD_NAME/image/upload/sriphone/landing/logo-fundo.webp
```

Substitua `SEU_CLOUD_NAME` pelo seu Cloud Name do Cloudinary.

## ✅ Verificação Final

- [ ] Pasta `sriphone/landing/` criada
- [ ] 4 imagens carregadas
- [ ] URLs acessíveis no navegador
- [ ] `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` configurado no `.env.local`

## 🚨 Problemas Comuns

**Erro: Imagem não aparece**
- Verifique se o Cloud Name está correto no `.env.local`
- Confirme que a pasta é `sriphone/landing/` (não `sriphone-landing`)
- Veja se a imagem está pública (não privada)

**Erro: 404 Not Found**
- Confira o nome exato do arquivo (case-sensitive)
- Verifique se a estrutura de pastas está correta

## 📝 Exemplo de URL Final

```
https://res.cloudinary.com/seu-cloud-name/image/upload/sriphone/landing/logo-fundo.webp
```

---

Após concluir o upload, você pode começar o desenvolvimento da landing page!
