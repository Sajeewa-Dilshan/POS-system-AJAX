import { Customer } from "../model/customer";

let customers:Customer[]=[];


export function getAllCustomers():Promise <Array<Customer>>{
return new Promise((resolve,reject)=>{


    // 1 AJAX
    let http=new XMLHttpRequest();
//2
http.onreadystatechange=function(){
    if(http.readyState==4){
    console.log(http.readyState);
    console.log("recieved it");
    console.log(http.responseText);
    console.log(http.responseXML);
    let dom=$(http.responseText);
    //let dom=$("<root>${http.responseText}</root>");
    //console.log($(http.responseText).find('table'));
console.log();
$(dom).find("table tbody tr").each((index,element)=>{

let id= $(element).find("td").first().text();
let name= $(element).find("td").eq(1).text();
let address= $(element).find("td").last().text();

customers.push(new Customer(id,name,address));

});
resolve(customers);
    }
}

// 3 
http.open('GET','http://localhost:8080/Module3/customers',true);

//4 if we have to set headers

//5

http.send();

//     for (let i=0;i<50;i++){
//     customers.push( new Customer(`C${i}`,"Kasun","Apura"));
// }
 //return customers;
 
});
}