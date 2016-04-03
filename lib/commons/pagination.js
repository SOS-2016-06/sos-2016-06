module.exports.returnASet = function(array,limit,offset){

  var result;
  array.forEach((recurso) => {
      for(var i=offset;i<=limit;i++){
      result.push(recurso);
    };
      return result;
    });
};
