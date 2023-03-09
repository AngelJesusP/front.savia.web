import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const swal = withReactContent(
    Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-primary',
            denyButton: 'btn btn-outline-primary',
        },
    })
);