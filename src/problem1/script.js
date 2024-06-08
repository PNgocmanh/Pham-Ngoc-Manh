var sum_to_n_a = function(n) {
  // your code here
  let sum = 0;
  for (let index = 1; index < n+1; index++) {
    sum += index;
  }
  return sum;
};

var sum_to_n_b = function(n) {
  // your code here
  if(n<=1) return 1;
  return n + sum_to_n_b(n-1);
};

var sum_to_n_c = function(n) {
  // your code here
  return n*(n+1)/2;
};

console.log(sum_to_n_c(5))
