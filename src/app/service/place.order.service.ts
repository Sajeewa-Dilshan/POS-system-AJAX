/**
 * @author : Sajeewa Dilshan <sajeewa@ijse.lk>
 * @since : 11/26/20
**/

import { resolve } from "../../../webpack.config";
import { Customer } from "../model/customer";
import { Item } from "../model/items";
import { OrdredItems } from "../model/orderedItems";

let items:Item[]=[];
let loaded = false;
let itemDetails:Item;
let clas:OrdredItems;

let customersForOrd:Customer[]=[];

let itemsForOrd:Item[]=[];

let orderedItems:string[]=[];

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
        resolve(customersForOrd);
        }console.log("customer array",customersForOrd);
      
    }
     
    // 3 
    http.open('GET','http://localhost:8080/Module3/customers',true);
    
    //4 if we have to set headers
    
    http.setRequestHeader("Content-Type","application/json");
    
    //5
    
    http.send();
    });
    }


    export function getItemForOrders():Promise <Array<Item>>{
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
            itemsForOrd=JSON.parse(http.responseText);
            resolve(itemsForOrd);
            }console.log("customer array",itemsForOrd);
          
        }
         
        // 3 
        http.open('GET','http://localhost:8080/Module3/items',true);
        
        //4 if we have to set headers
        
        http.setRequestHeader("Content-Type","application/json");
        
        //5
        
        http.send();
        });
        }



    export function deleteOrdItem(code: string): void{

            items.splice(items.findIndex((elm)=>elm.code=code),1);
                      
            
     
    }


    export function orderedItem(code: string): void{

        orderedItems.push(code);
        
 
}

export function getItemDetails(id:string,code:string,orderedQty:string): Promise<Item>{
    return new Promise((resolve,reject)=>{

        console.log("parsed code ", code );
    
        let http=new XMLHttpRequest;
    
        http.onreadystatechange=function(){
            if(http.readyState==4){
               let dom= (http.responseText)
             itemDetails=(JSON.parse(dom));
               
               resolve(itemDetails);
               console.log(http.responseText);
            }
        }
    
        http.open('GET',`http://localhost:8080/Module3/placeorders?id=${id}&code=${code}&qty=${orderedQty}`,true);
       
        http.setRequestHeader("Content-Type","application/json");

        http.send();
    
    });
    
    }


    
 export   function sendOrderedItems():Promise<void>{
        return new Promise((resolve,reject)=>{
            alert("sfgdfgdf  ");
            let http =new XMLHttpRequest;

            http.onreadystatechange=function(){
                if(http.readyState==4){
                   
                     clas =new OrdredItems(["I002","I005","I006"],["1","2","3"]);
                      console.log("strgify",JSON.stringify(clas));
                      resolve();
                      
                }
            }

            http.open('POST','http://localhost:8080/Module3/placeorders',true);

            http.setRequestHeader('Content-Type','application/json');

            //http.send(JSON.stringify(clas))
            http.send(JSON.stringify(clas))

        });


    }