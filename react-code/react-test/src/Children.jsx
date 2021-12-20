import React from 'react';
const Children = (props) => {
//   React.Children.map(props.children, (ele) => {
//       console.log(ele)
//   })
React.Children.map([1,2,3,[4,5,[6,[7,8]]]], (ele) => {
    console.log(ele)
})
  return props.children;
};

export default Children;
