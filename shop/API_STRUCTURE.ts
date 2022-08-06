export const a = null;

// формат данных для фильтра
const getFilter = {
    filters: [
        {
            type: 'string',
            label: 'string', // не обязательное поле
            value: [
                {
                    value: 'string',
                    state: 'false | string | number' 
                }
            ]
        }
    ]
}
// example
// start
const filterTogle = {
    type: 'togle',
    value: [{value: 'Все товары'}, {value: 'В наличии'}], 
  }
  
  const priceSeparation = {
    type: 'price',
    value: [{value: 'null'}],
  }
  
  const selectboxFilter = {
    type: 'selectbox',
    label: "Срок доставки",
    value: [
      {value: 'Сегодня или завтра'},
      {value: 'До 5 дней'},
      {value: 'Любая'},
    ]
  } 
  
  const checkBoxFilter = {
    type: 'checkbox',
    label: "Объем",
    value: [
      {value: '10ml'},
      {value: '20ml'},
      {value: '30ml'},
      {value: '40ml'},
    ]
  }
  
  const filters= [
    filterTogle,
    priceSeparation,
    selectboxFilter,
    checkBoxFilter,
  ];
//   end



//  формат данных для каруселей на главной странице(хиты / распродажи) (возможно обновиться)
const getScele = {
    kategory: [
        {
            label: 'string',
            slides: [
                {
                    img: 'src',
                    isNew: 'boolean',
                    hasSale: 'boolean',
                    price: 'number',
                    description: 'string',
                } 
            ]
        }
    ]
}

//  формат данных для основной карусели на главной странице
const getMainSwiper = {
    imgs: ['stringSrc']
}