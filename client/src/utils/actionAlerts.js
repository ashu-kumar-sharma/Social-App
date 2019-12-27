// import Swal from 'sweetalert2/sweetalert2';
import Swal from "sweetalert2";

export const successAlert = title => {
    Swal.fire({
        type: 'success',
        title,
    })
}

export const errorAlert = title => {
    Swal.fire({
        type: 'error',
        title,
    })
}

export const warningAlert = title => {
    Swal.fire({
        type: 'warning',
        title,
    })
}

export const infoAlert = title => {
    Swal.fire({
        type: 'info',
        title,
    })
}

export const toast =(value) =>{
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });

    Toast.fire({
        type: 'success',
        title: value
    })
};

export const deleteBuzz= (value, id)=> {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#00d63c',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            value(id);
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })
}