export function getProducts() {
     return new Promise((res) => {
          res([
               {
                    name: 'Scarpin Sligback Bebecê Salto Médio Taça Detalhe Metalizado',
                    image: '../../public/static/images/produtos/scarpin-vermelho.png',
                    price: { amount: 179.90, isDiscount: null },
                    id: 1,
               },
               {
                    name: 'Sandália Braco Blanc Tratorada',
                    image: '../../public/static/images/produtos/sandalia-branca.png',
                    price: { amount: 319.89, isDiscount: 459.90 },
                    id: 2,
               },
               {
                    name: 'Coturno Feminino Bebecê Tratorado Detalhe Tachas',
                    image: '../../public/static/images/produtos/coturno-preto.png',
                    price: { amount: 315, isDiscount: 349.90 },
                    id: 3,
               },
               {
                    name: 'Scarpin Bebecê Salto Alto Taça Com Fivela',
                    image: '../../public/static/images/produtos/scarpin-branco.png',
                    price: { amount: 159.90, isDiscount: null },
                    id: 4,
               },
               {
                    name: 'Slingback Branco Tiras Bico Fino Couro',
                    image: '../../public/static/images/produtos/slingback-branco.png',
                    price: { amount: 379.90, isDiscount: null },
                    id: 5,
               },
          ]);
     });
}
