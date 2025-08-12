# 💊 SISTEMA DE FARMÁCIA — API (NestJS + MySQL)
Projeto desenvolvido como parte do Bootcamp da Generation Brasil — Bloco 02.
O foco é construir uma API REST em TypeScript usando NestJS e TypeORM, aplicando POO, camadas (Controller/Service/Entity/Module) e relacionamentos em banco de dados.

## 📋 Descrição

Back-end em **NestJS** para controle de **Categorias** e **Produtos** de farmácia, com relacionamento **1:N (Categoria → Produtos)**.  
O projeto aplica boas práticas de camadas (Controller/Service/Entity/Module), **TypeORM (MySQL)**, validação com **class-validator**, e tratamento consistente de erros (400/404/201/200).  
Inclui **busca por nome**, exemplos práticos no **Insomnia** e scripts NPM para rodar em dev e produção.


## 🧱 Tecnologias
 - Node.js + TypeScript

 - NestJS

 - TypeORM (MySQL)

 - class-validator / class-transformer

 - Insomnia (para testes)

## 🗂 Estrutura
```
├─ src
│  ├─ app.module.ts
│  ├─ main.ts
│  ├─ categoria
│  │  ├─ categoria.module.ts
│  │  ├─ controllers
│  │  │  └─ categoria.controller.ts
│  │  ├─ services
│  │  │  └─ categoria.service.ts
│  │  └─ entities
│  │     └─ categoria.entity.ts
│  └─ produto
│     ├─ produto.module.ts
│     ├─ controllers
│     │  └─ produto.controller.ts
│     ├─ services
│     │  └─ produto.service.ts
│     └─ entities
│        └─ produto.entity.ts
├─ test
│  └─ app.e2e-spec.ts
├─ .env.example
├─ package.json
└─ README.md
```

## 🚀 Como Rodar o Projeto

   
1 - Clone o repositório
    ```
    git clone https://github.com/seu-usuario/seu-repo.git
    cd seu-repo
    ```

2 - Instale as dependências
    ```
    npm install
    ```
    
3 - Configure o ambiente
    ```
    Copie o arquivo .env.example para .env
    ```
   
4 - Rodar em desenvolvimento
    ```
    npm run farmacia
    ```
## 🧑‍💻 Autor(a)
Maeli Palharini
Estudante de Análise e Desenvolvimento de Sistemas | Eng. Florestal | Em transição para a área Tech
GitHub: @MaeliPalharini

## 📜 Licença
Projeto de uso educacional. Todos os direitos reservados à autora para fins de portfólio.