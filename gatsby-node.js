// const path = require(`path`)

// exports.createPages = async ({actions, graphql}) => {
//     const {createPage} = actions;


//   const result = await graphql(`
//   query MyQuery {
//     Lollies {
//       LolyData {
//         link
//       }
//     }
//   }
  

//   `) 
//   console.log("result is " ,JSON.stringify(result.data))


//   result.data.Lollies.LolyData.forEach(( obj) => {
//       console.log("obj" , obj)
//     createPage({
//       path: `/lolies/${obj.link}`,
//       component: path.resolve(`./src/component/template.tsx`),
//       context: {
//         lolyDetails: obj
//     }
//     })
//   })
// }
