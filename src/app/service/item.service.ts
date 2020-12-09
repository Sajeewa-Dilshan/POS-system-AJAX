import { resolve } from "../../../webpack.config";
import { Customer } from "../model/customer";
import { Item } from "../model/items";

let items:Item[]=[];


export function getAllItems():Promise <Array<Item>>{
    return new Promise((resolve,reject)=>{
        
            let http1=new XMLHttpRequest();

            http1.onreadystatechange=function(){
                if(http1.readyState==4){
                    console.log(http1.responseXML);
                    console.log(http1.responseText);
                    let dom=$(http1.responseText);
                    $(dom).find("table tbody tr").each(function(index,element){

                        let code=$(element).find('td').first().text();
                        let description=$(element).find('td').eq(1).text();
                        let unitPrice=$(element).find('td').eq(2).text();
                        let qtyOnHand=$(element).find('td').last().text();
                        
                        items.push(new Item(code,description,parseFloat(unitPrice),parseFloat(qtyOnHand)));

                    });
                    resolve(items);
                }

            }
            http1.open('GET','http://localhost:8080/Module3/items');
            
            http1.send();
    });

}