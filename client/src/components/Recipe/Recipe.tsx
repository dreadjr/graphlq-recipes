// import * as React from 'react';
// import { Query, ChildProps } from 'react-apollo';
// import GET_ALL_RECIPES from '../../queries/getAllRecipes';

// export default (props: ChildProps) => (
//   <Query query={GET_ALL_RECIPES}>
//     {({ loading, error, data }) => {
//       if (loading) return <div>Loading</div>;
//       if (error) return <div>Error</div>;

//       return data.recipes.map((recipe: any) => (
//         <>
//           <div>{recipe.name}</div>
//           <div>{recipe.description}</div>
//         </>
//       ));
//     }}
//   </Query>
// );
