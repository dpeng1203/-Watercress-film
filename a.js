
// 求一个字符串里出现最多的字符
var str = 'assddsdffsadfdfs'
var json ={}
for (var i = 0;i < str.length; i++){
    if(!json[str.charAt(i)]){
        json[str.charAt(i)] = 1
    }
    else{
        json[str.charAt(i)] ++
    }
}

var max = 0
var iMax = ''
for (var k in json){
    if (json[k] > max){
        max = json[k]
        iMax = k
    }
}
console.log(max,iMax)

//去掉数组里重复元素

var arr = [1,2,3,4,3,2,,4,5,2,4,5,3]
var obj = {}
var arr1 = []
for (var i=0; i< arr.length; i++){
    if(!obj[arr[i]]){
        obj[arr[i]] = 1
        arr1.push(arr[i])
    }
}