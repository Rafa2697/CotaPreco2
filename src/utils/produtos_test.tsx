

const PRODUCTS = [
  {
    title: "Ofertas",
    data: [{
      "nome": "Maçã",
      "valor": 5.50,
      "local": {
        "nomeEstabelecimento": "Supermercado ABC",
        "cidade": "Peruíbe"
      },
      "data": "2024-05-27"
    }, {
      "nome": "salgadinho",
      "valor": 5.99,
      "local": {
        "nomeEstabelecimento": "Supermercado ABC",
        "cidade": "Peruíbe"
      },
      "data": "2024-05-27"
    },]
  },
  {
    title: "Alimentos",
    data: [{
      "nome": "Arroz",
      "valor": 30.51,
      "local": {
        "nomeEstabelecimento": "Supermercado ABC",
        "cidade": "Peruíbe"
      },
      "data": "2024-05-27"
    }, 
    {
      "nome": "bolacha recheada",
      "valor": 1.99,
      "local": {
        "nomeEstabelecimento": "Supermercado ABC",
        "cidade": "Peruíbe"
      },
      "data": "2024-05-27"
    },
    {
      "nome": "Feijão",
      "valor": 5.99,
      "local": {
        "nomeEstabelecimento": "Supermercado ABC",
        "cidade": "Peruíbe"
      },
      "data": "2024-05-27"
    },
    {
      "nome": "Óleo Liza",
      "valor": 5.99,
      "local": {
        "nomeEstabelecimento": "Supermercado ABC",
        "cidade": "Peruíbe"
      },
      "data": "2024-05-27"
    },
  ]
  },

  {
    title: "Limpeza",
    data: [{
      "nome": "Cloco 2L",
      "valor": 14.99,
      "local": {
        "nomeEstabelecimento": "Supermercado ABC",
        "cidade": "Peruíbe"
      },
      "data": "2024-05-27"
    }, 
    {
      "nome": "Detergente Ype",
      "valor": 1.99,
      "local": {
        "nomeEstabelecimento": "Supermercado ABC",
        "cidade": "Peruíbe"
      },
      "data": "2024-05-27"
    },
    {
      "nome": "Sabão em pó OMO",
      "valor": 17.90,
      "local": {
        "nomeEstabelecimento": "Supermercado ABC",
        "cidade": "Peruíbe"
      },
      "data": "2024-05-27"
    },
  ]
  },
  {
    title: "Higiene pessoal",
    data: [{
      "nome": "Sabonete",
      "valor": 4.99,
      "local": {
        "nomeEstabelecimento": "Supermercado ABC",
        "cidade": "Peruíbe"
      },
      "data": "2024-05-27"
    }, 
    {
      "nome": "Shampoo",
      "valor": 13.99,
      "local": {
        "nomeEstabelecimento": "Supermercado ABC",
        "cidade": "Peruíbe"
      },
      "data": "2024-05-27"
    },
    {
      "nome": "condicionador",
      "valor": 15.99,
      "local": {
        "nomeEstabelecimento": "Supermercado ABC",
        "cidade": "Peruíbe"
      },
      "data": "2024-05-27"
    },
    {
      "nome": "Desodorante",
      "valor": 19.99,
      "local": {
        "nomeEstabelecimento": "Supermercado ABC",
        "cidade": "Peruíbe"
      },
      "data": "2024-05-27"
    },
    {
      "nome": "Pasta de dente Colgate",
      "valor": 4.99,
      "local": {
        "nomeEstabelecimento": "Supermercado ABC",
        "cidade": "Peruíbe"
      },
      "data": "2024-05-27"
    },
  ]
  },
  {
    title: "Bebidas",
    data: [{
      "nome": "Agua mineral 250ml",
      "valor": 2.99,
      "local": {
        "nomeEstabelecimento": "Supermercado ABC",
        "cidade": "Peruíbe"
      },
      "data": "2024-05-27"
    }, 
    {
      "nome": "Agua mineral 1L",
      "valor": 5.99,
      "local": {
        "nomeEstabelecimento": "Supermercado ABC",
        "cidade": "Peruíbe"
      },
      "data": "2024-05-27"
    },
    {
      "nome": "Coca Cola 350ml",
      "valor": 4.99,
      "local": {
        "nomeEstabelecimento": "Supermercado ABC",
        "cidade": "Peruíbe"
      },
      "data": "2024-05-27"
    },
    {
      "nome": "Coca Cola zero 350ml ",
      "valor": 4.99,
      "local": {
        "nomeEstabelecimento": "Supermercado ABC",
        "cidade": "Peruíbe"
      },
      "data": "2024-05-27"
    },
    {
      "nome": "Coca Cola 1L ",
      "valor": 13.99,
      "local": {
        "nomeEstabelecimento": "Supermercado ABC",
        "cidade": "Peruíbe"
      },
      "data": "2024-05-27"
    },
    {
      "nome": "Coca Cola zero 1L ",
      "valor": 13.99,
      "local": {
        "nomeEstabelecimento": "Supermercado ABC",
        "cidade": "Peruíbe"
      },
      "data": "2024-05-27"
    },
    {
      "nome": "Dolly 1L ",
      "valor": 7.99,
      "local": {
        "nomeEstabelecimento": "Supermercado ABC",
        "cidade": "Peruíbe"
      },
      "data": "2024-05-27"
    },
  ]
  }
]



const CATEGORIES = PRODUCTS.map((item) => item.title) //pegando apenas os titulos das categorias

export { PRODUCTS, CATEGORIES }