/**
 * @author : Ranjith Suranga <suranga@ijse.lk>
 * @since : 11/26/20
 **/

import manageItems from './manage-items.component.html';
import style from './manage-items.component.scss';
import '../../../node_modules/admin-lte/plugins/datatables/jquery.dataTables.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js';
import { getAllItems, saveItem, deleteItem } from '../service/item.service';
import { Item } from '../model/items';

let dataTable2:any=null;

$("app-manage-items").replaceWith('<div id="manage-items">' + manageItems + '</div>');
var html = '<style>' + style + '</style>';
$("#dashboard").append(html);


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

    if(dataTable2){
        ($("#tbl-items") as any).DataTable().destroy();
        $("#tbl-items tbody tr").remove();
        
    }


    for (const item of items){
        $("#tbl-items tbody").append(`
        <tr>
        <td>${item.code}</td>
        <td>${item.description}</td>
        <td>${item.unitPrice}</td>
        <td>${item.qtyOnHand}</td>
        <td><i class="fas fa-trash"></i></td>
        </tr>
        `);}

        dataTable2=($("#tbl-items") as any).DataTable({
            "info": false,
            "searching": false,
            "lengthChange": false,
            "pageLength": 5,
            "ordering":false
        });
        dataTable2.page(Math.ceil(items.length/5)-1).draw('page');

    }

    loadAllItems();


    $('#btn-save-item').click(async()=>{
   

        let code=<string> $('#txt-code').val();
        let description=<string> $("#txt-description").val();
        let unitPrice=<string> $('#txt-unitprice').val();
        let qtyOnHand=<string> $('#txt-qty').val();
    
        if(code.match(/^I\d{3}$/ || description.trim().length==0 || unitPrice.trim().length==0)||qtyOnHand.trim().length==0){
            alert("Invalid item inputs");
            return;
        }

     
    
       
       try{
        await saveItem(new Item(code,description,parseFloat(unitPrice),parseFloat(qtyOnHand))); 
       
            alert("Saved item");
            loadAllItems();
       }catch(error){
            alert("failed to save item");
            console.log(error);
    
        }
    
    })
    




