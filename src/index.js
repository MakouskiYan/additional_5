module.exports = function check(str, bracketsConfig) {
  var stack = [];
  var form = {};
  var type = {};
  for (var i = 0; i < bracketsConfig.length; i++) {
    var left = bracketsConfig[i][0];
    var right = bracketsConfig[i][1];
    form[left] = right;
    form[right] = left;
    type[left] = "opened";
    type[right] = "closed";
  }
  for (var i = 0; i < str.length; i++) {
    // чтобы не оставалось предыдущ значение топа на всякий случай;
    var top = stack.length <= 0 ? null : stack[stack.length - 1];
    var curr = str[i];
    if (type[curr] == "opened") {
      stack.push(curr);
    }//если закрытая |- не такая и пустой стек то false
    else if (type[curr] == "closed" && curr !== form[curr] && stack.length == 0) {
      return false;
      //если закрытая и топ не ее обратная скобка и не |-такая
    } else if (type[curr] == "closed" && top !== form[curr] && curr !== form[curr]) {
      return false;
    }//если закрытая и топ подходит по форме
      else if (type[curr] == "closed" && top == form[curr]) {
      stack.pop();
      //если закрытая пустой стек и |-такая
    } else if (type[curr] == "closed" && stack.length == 0 && curr == form[curr]) {
      stack.push(curr);
      //если закрытая стек не пустой и |-такая и топ подходит
    } else if (type[curr] == "closed" && stack.length > 0 && top == form[curr]){
      stack.pop;
      //если закрытая и не пустой стек и |-такая то добавляем в стек
    }else if (type[curr] == "closed" && stack.length > 0 && curr == form[curr] ){
      stack.push(curr);
    }
  }
  return (stack.length == 0) ? true : false;
}