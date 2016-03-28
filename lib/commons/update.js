module.exports.updateFunction = function(arr,param1,param2,content1,content2,element){
  for (var i in arr) {
     if (arr[i][param1] == content1 && arr[i][param2] == content2){
        arr[i] = element;
     };
   };
};
