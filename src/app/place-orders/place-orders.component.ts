/**
 * @author : Sajeewa Dilshan <sajeewa@ijse.lk>
 * @since : 11/26/20
**/

import placeOrders from './place-orders.component.html';
import style from './place-orders.component.scss';
import 'admin-lte/plugins/datatables/jquery.dataTables.min';
import 'admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min';
import 'admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min';
import 'admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min';
import { getAllItems, saveItem, deleteItem } from '../service/item.service';
import { Item } from '../model/items';
import { getAllCustomers } from '../service/customer.service';
import { getCusForOrders, getItemForOrders } from '../service/order.service';

let dataTable3:any=null;

$("app-place-orders").replaceWith('<div id="place-orders">' + placeOrders + '</div>');
var html = '<style>' + style + '</style>';
$("#dashboard").append(html);


async function loadAllCustomers(){
   
    let customers= await getCusForOrders();
 for(const customer of customers){
        console.log(customer.address);
        $('#customer-select').append(`<option value=${customer.id}  >${customer.id} </option>`);
         }
     }

 loadAllCustomers();

 async function loadAllItems(){
   
    let items= await getItemForOrders();
 for(const item of items){
        console.log(item.code);
        $('#item-select').append(`<option value=${item.code}  >${item.code} </option>`);
         }
     }

/*  $("#btn-save-order").on('click',async (event:Event)=>{
    let code = ($(event.target as any).text());
    alert(code);
    try{
     
}catch{
      alert("Failed to delete");
  }
});  
 */
    //  <td>${customer.name}</td>
            //  <td>${customer.address}</td>
            //  <td><i class="fas fa-trash"></i></td>

            
$("#btn-save-order").on('click',function(){
    let cusCode=$('#customer-select :selected').text();
    alert(cusCode);

});

