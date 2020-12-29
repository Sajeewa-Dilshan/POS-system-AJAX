import { Customer } from "../model/customer";
import { Item } from "../model/items";


let items: Array<Item>=[];

export function getAllItem2(): Promise<Array<Item>>{
    
    return new Promise((resolve,reject)=>{
    

    let http= new XMLHttpRequest();

    http.onreadystatechange=function(){
        if(http.readyState==4){
        
            let dom=(http.responseText);
            items=(JSON.parse(dom));
            resolve(items);
        }


    }


  /*   http.onreadystatechange=function(){
        if(http.readyState==4){
            let dom=$(<any>http.responseXML).find('item');
            
            for(let i=0;i<dom.length;i++){
                items.push(new Item($(dom[i]).find('code').text(),$($(dom[i]).children()[1]).text(),
                parseFloat($($(dom[i]).children()[2]).text()),parseFloat($($(dom[i]).children()[3]).text())));
             
            
            }
  
            resolve(items);

        }
    } */

/*     http.onreadystatechange=function(){
        console.log("Awaaaaaa");
       if(http.readyState==4){
        //console.log(http.responseText);
        console.log("XML",http.responseXML);
        // console.log($(http.responseText).find('td'));
      //  let dom=$(http.responseText).find('tbody tr');
        let dom=$(<any>http.responseXML).find('tbody tr');

        let dom=(http.)

        for (let i=0;i<dom.length;i++){
            let code= $($(dom[i]).children()[0]).text();
            let description= $($(dom[i]).children()[1]).text();
            let unitPrice= $($(dom[i]).children()[2]).text();
            let qtyOnHand= $($(dom[i]).children()[3]).text();
            items.push(new Item(code,description,parseFloat(unitPrice),parseFloat(qtyOnHand)));
            console.log(code);
            resolve(items);
        }
      
       }

    } */

    http.open('GET','http://localhost:8080/Module3/items2',true);

    
    http.send();
    return items;
});

}
