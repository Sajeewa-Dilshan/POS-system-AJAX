import { resolve } from "../../../webpack.config";
import { Customer } from "../model/customer";
import { Item } from "../model/items";

let items:Item[]=[];
let loaded = false;

export function getAllItems():Promise <Array<Item>>{
    return new Promise((resolve,reject)=>{
        if (!loaded) {
            let http1=new XMLHttpRequest();

            http1.onreadystatechange=function(){
                if(http1.readyState==4){
                    console.log(http1.responseXML);
                    console.log(http1.responseText);
                    //let dom=$(http1.responseText);
                    items=JSON.parse(http1.responseText);
                   /* let dom=$(http1.responseText);
                     $(dom).find("table tbody tr").each(function(index,element){
                        console.log("kjkj",element);
                   

                        let code=$(element).find('td').first().text();
                        let description=$(element).find('td').eq(1).text();
                        let unitPrice=$(element).find('td').eq(2).text();
                        let qtyOnHand=$(element).find('td').last().text();
                        
                        items.push(new Item(code,description,parseFloat(unitPrice),parseFloat(qtyOnHand)));

                    }); */
                    resolve(items);

                }  console.log("items array",items);
                loaded = true;
            }
            http1.open('GET','http://localhost:8080/Module3/items',true);
            
            http1.send();
        }else{
            resolve(items);
        }
    });

}

export function saveItem(item:Item):Promise<void>{
    return new Promise((resolve,reject)=>{
        let http = new XMLHttpRequest();
    
        http.onreadystatechange=()=>{
            if(http.readyState==4){
              //  let success=JSON.parse(http.responseText);
              if(http.status==201){
                items.push(item);
                resolve ();
            }else{
                reject("someyhing went wrong");

            }
        
        }
        };
    
        http.open("POST","http://localhost:8080/Module3/items",true);
    
        http.setRequestHeader('Content-Type','application/json');
    
        http.send(JSON.stringify(item));
    
         
    });
    } 


export function deleteItem(code:string): Promise<void>{
    console.log("code",code);
    
    return new Promise((resolve,reject)=>{
        let http = new XMLHttpRequest();
        
        http.onreadystatechange=()=>{
            if(http.readyState==4){
                //let success=JSON.parse(http.responseText);
                if(http.status==204){
                    items.splice(items.findIndex((elm)=>elm.code=code),1);
                    resolve ();
                }else{
                    reject("someyhing went wrong");
    
                }
           
        
        }
        };
    
        http.open("DELETE",`http://localhost:8080/Module3/items?code=${code}`,true);
    
        http.send();
    
         
    });
}

let customersForOrd:Customer[]=[];

export function getCusForOrders():Promise <Array<Customer>>{
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
        customersForOrd=JSON.parse(http.responseText);
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
    resolve(customersForOrd);
        }console.log("customer array",customersForOrd);
      
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
   
   
    });
    }

    
    