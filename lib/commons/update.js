module.exports.updateFunction = function(arr,param1,param2,content1,content2,element){
//update object

  for (var i in arr) {

  	//if city element i in arr is content1(is city ) and date element i in arr is content2(is date) then update this position with element
     if (arr[i][param1] == content1 && arr[i][param2] == content2){
        arr[i] = element;
     };
   };
};
