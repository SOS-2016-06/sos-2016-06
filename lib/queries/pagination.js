module.exports.returnASet = function(array,limit,offset){

  var result = [];
  var i;
      for(i=offset;i<=limit;i++){
        result.push(array[i]);
    };
    return result;
};
