import { resolve } from "../../../webpack.config";
import { Customer } from "../model/customer";

let customers:Customer[]=[];
let loaded=false;

export function getAllCustomers():Promise <Array<Customer>>{
return new Promise((resolve,reject)=>{

    if(!loaded){

   

    // 1 AJAX
    let http=new XMLHttpRequest();
//2
http.onreadystatechange=function(){
    if(http.readyState==4){
    console.log(http.readyState);
    console.log("recieved it");
    console.log(http.responseText);
    console.log(http.responseXML);
   customers=JSON.parse(http.responseText);
   // let dom=$(http.responseText);
   // let dom=$(http.responseXML as any);
    //let dom=$("<root>${http.responseText}</root>");
    //console.log($(http.responseText).find('table'));
/* 
$(dom).find("customers customer").each((index,element)=>{

let id= $(element).find("id").text();
let name= $(element).find("name").text();
let address= $(element).find("address").text();

customers.push(new Customer(id,name,address));


}); */
resolve(customers);
    }console.log("customer array",customers);
  
}
 
// 3 
http.open('GET','http://localhost:8080/Module3/customers',true);

//4 if we have to set headers

http.setRequestHeader("Content-Type","application/json");

//5

http.send();

//     for (let i=0;i<50;i++){
//     customers.push( new Customer(`C${i}`,"Kasun","Apura"));
// }
 //return customers;
 loaded=true;
}else{
    resolve(customers);
}
});
}

export function saveCustomer(customer:Customer):Promise<void>{
return new Promise((resolve,reject)=>{
    let http = new XMLHttpRequest();

    http.onreadystatechange=()=>{
        if(http.readyState==4){
            //let success=JSON.parse(http.responseText);
            if(http.status==201){
                customers.push(customer);
                resolve ();
            }else{
                reject("someyhing went wrong");

            }
       
    
    }
    };

    http.open("POST","http://localhost:8080/Module3/customers",true);

    http.setRequestHeader('Content-Type','application/json');

    http.send(JSON.stringify(customer));

     
});
} 


export function deleteCustomer(id:string): Promise<void>{
    console.log("id",id);
    
    return new Promise((resolve,reject)=>{
        let http = new XMLHttpRequest();
        
        http.onreadystatechange=()=>{
            if(http.readyState==4){
                //let success=JSON.parse(http.responseText);
                if(http.status==204){
                    customers.splice(customers.findIndex((elm)=>elm.id=id),1);
                    resolve ();
                }else{
                    reject("someyhing went wrong");
    
                }
           
        
        }
        };
    
        http.open("DELETE",`http://localhost:8080/Module3/customers?id=${id}`,true);
    
        http.send();
    
         
    });
}

