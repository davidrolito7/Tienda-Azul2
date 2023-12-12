<template>
    <div class="overflow-x-auto h-44">
        <table class="table">
            <!-- head -->
            <thead>
                <tr>
                    <th>Folio</th>
                    <th>Empleado</th>
                    <th>Articulos</th>
                    <th>Total</th>
                    <th>Fecha</th>
                </tr>
            </thead>
            <tbody>

                <tr class="hover" v-for="venta in ventas" :key="venta.id">
                    <th>#{{ venta.id }}</th>
                    <td>{{ venta.employee.fullname }}</td>
                    <td>{{ venta.items.length }}</td>
                    <td>${{ venta.total.toFixed(2) }} </td>
                    <td>
                        <timeago :datetime="venta.createdAt" :locale="es" />
                    </td>
                </tr>

            </tbody>
        </table>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useVentaStore } from '../../stores/venta'
import { es } from 'date-fns/locale'
const { ventas, fetchVentas } = useVentaStore()

onMounted(async () => {
    await fetchVentas()
})


</script>
