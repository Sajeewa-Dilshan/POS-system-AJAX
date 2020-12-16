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
import { getCusForOrders } from '../service/order.service';

let dataTable3:any=null;

$("app-place-orders").replaceWith('<div id="place-orders">' + placeOrders + '</div>');
var html = '<style>' + style + '</style>';
$("#dashboard").append(html);

/* 
$("#tbl-items tbody").on('click','tr .fas',async (event:Event)=>{
    let code = ($(event.target as any).parents("tr").find("td:first-child").text());
    try{
        await deleteItem(code);
    alert("Item has been deleted");
    loadAllItems();
}catch{
    
    alert("Failed to delete");
  }
});


async function loadAllItems(){

    let items=await getAllItems();

    if(dataTable3){
        ($("#tbl-orders") as any).DataTable().destroy();
        $("#tbl-orders tbody tr").remove();
        
    }


    for (const item of items){
        $("#tbl-orders tbody").append(`
        <tr>
        <td>${item.code}</td>
        <td>${item.description}</td>
        <td>${item.unitPrice}</td>
        <td>${item.qtyOnHand}</td>
        <td><i class="fas fa-trash"></i></td>
        </tr>
        `);}

        dataTable3=($("#tbl-orders") as any).DataTable({
            "info": false,
            "searching": false,
            "lengthChange": false,
            "pageLength": 5,
            "ordering":false
        });

        dataTable3.page(Math.ceil(items.length/5)-1).draw('page');

    }

    loadAllItems();

    $('#btn-save-order').click(async()=>{
   

        let code=<string> $('#txt-code').val();
        let description=<string> $("#txt-description").val();
        let unitPrice=<string> $('#txt-unitprice').val();
        let qtyOnHand=<string> $('#txt-qty').val();
    
       let success= await saveItem(new Item(code,description,parseFloat(unitPrice),parseFloat(qtyOnHand))); 
       console.log(success) ;
    
   /*     if(success){
            alert("Saved");
            loadAllItems();
       }else{
            alert("failed to success");
       } */
    
  //  }) */
    
  

async function loadAllCustomers(){
   
    let customers= await getCusForOrders();
 for(const customer of customers){
        console.log(customer.address);
        $('#customer-select').append(`<option value=${customer.id}  >${customer.id} </option>`);
         }
     }

 loadAllCustomers();

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

