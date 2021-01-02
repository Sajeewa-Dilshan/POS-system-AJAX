/**
 * @author : Sajeewa Dilshan <sajeewa@ijse.lk>
 * @since : 11/26/20
**/

import searchOrders from './search-orders.component.html';
import style from './search-orders.component.scss';
import 'admin-lte/plugins/datatables/jquery.dataTables.min';
import 'admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min';
import 'admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min';
import 'admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min';
import { getAllItems, saveItem, deleteItem } from '../service/item.service';
import { Item } from '../model/items';
import { getAllCustomers } from '../service/customer.service';
import { getCusForOrders, getItemDetails, getItemForOrders, sendOrderedItems } from '../service/place.order.service';
import { LoaderOptionsPlugin } from 'webpack';

let dataTable3:any=null;
let items: Array<Item>=[];


$("app-search-orders").replaceWith('<div id="search-orders">' + searchOrders + '</div>');
var html = '<style>' + style + '</style>';
$("#dashboard").append(html);

 $("#tbl-place-orders tbody").on('click','tr .fas',async (event:Event)=>{
    $(event.target as any).parents("tr").remove();
    let id = ($(event.target as any).parents("tr").find("td:first-child").text());


}); 

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

     loadAllItems();

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

/* $('#item-select').on('change',function(){    
  let x=$(this).val;         
        alert(x);   
    }  );
 */

/* $(function(){
    $("#item-select").change(function(){
        var dis=$("#item-select options:selected").text();
        alert(dis);
    })
}) */


$("#btn-add-to-cart").on('click',function(){

    $("#txt-description-po").val("");
    $("#txt-unitprice-po").val("");
    $("#txt-totalPrice").val("");
     

  
    let code=<string>$('#txt-itemCode').val();
    let orderedQty=<string>$('#txt-ordQty').val();
    let conNum= parseInt(orderedQty);
 
 
    if(!code.match(/^I\d{3}$/) ||  !(conNum>0)){
        alert("Invalid item inputs");
        return;
    }

    console.log("ordered qty");
    loadItemDetails(code as any,orderedQty as any );
  
});

 async function loadItemDetails(code:string,orderedQty:string){
    
     let itemDetails:any=await getItemDetails(code,orderedQty);
     console.log(itemDetails);

     if(itemDetails=="Enter a Valid Item Code"){
         alert("Enter a Valid Item Code");
         return

     }else if(itemDetails=="Enter a Valid Item Qty"){
        alert("Enter a Valid Item Qty");
        return

     }

    let description:any=itemDetails.description;
     let unitPrice:any=itemDetails.unitPrice;
    let itemTotal =parseFloat(unitPrice)*parseInt(orderedQty);
   
    let totalBill: any=0;

    console.log(description,unitPrice);

  
    $("#txt-description-po").val(description);
     $("#txt-unitprice-po").val(unitPrice);
    

     $('#tbl-place-orders tbody').append(`<tr>
     <td>${code}</td>
     <td>${description}</td>
     <td>${orderedQty}</td>
     <td>${unitPrice}</td>
     <td>${itemTotal}</td>
     <td><i class="fas fa-trash"></i></td>
     
     </tr>`);

     dataTable3=($("#tbl-place-orders") as any).DataTable({
        "info": false,
        "searching": false,
        "lengthChange": false,
        "pageLength": 5,
        "ordering":false
    });
    console.log("length", $('#tbl-place-orders tbody').children().length); 

    for(let i=0; i< $('#tbl-place-orders tbody').children().length;i++ ){
        // total += Number.parseFloat($($($('tbody').find('tr')[i]).children()[4]).text());
        totalBill = totalBill+ parseFloat($($($('#tbl-place-orders tbody').find('tr')[i]).children()[4]).text());
         }

     $("#txt-totalPrice").val(totalBill);
     
}



$('#btn-save-order').on('click',async()=>{
    let itemsForSend:any=[];
    let qtyForSend:any=[];
    let totalForSend:any=0;
    let cusId=<string>$('#txt-cusId').val();

    if(!cusId.match(/^C\d{3}$/)){
        alert("please enter valid customer id")
    }

    for(let i=0; i< $('#tbl-place-orders tbody').children().length;i++ ){
        // total += Number.parseFloat($($($('tbody').find('tr')[i]).children()[4]).text());
        itemsForSend.push($($($('#tbl-place-orders tbody').find('tr')[i]).children()[0]).text());
        qtyForSend.push($($($('#tbl-place-orders tbody').find('tr')[i]).children()[2]).text());
        totalForSend=totalForSend+parseFloat($($($('#tbl-place-orders tbody').find('tr')[i]).children()[4]).text());
         }

         console.log(itemsForSend,qtyForSend,totalForSend);

   let ans= await sendOrderedItems(cusId,itemsForSend,qtyForSend,totalForSend);
    if(ans=="Enter valid customer id"){
        alert("Enter valid customer id")
    }else if("Saved Order"){
        alert("Saved Order")
    }
})