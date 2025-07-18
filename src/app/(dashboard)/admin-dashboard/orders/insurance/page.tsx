'use client';

import { useEffect, useState } from 'react';
import SlideOver from '@/components/admin/SlideOver';
import {OrderDetails} from '@/types/all';
import { InsuranceOrderTable } from '@/components/admin/InsuranceOrdersTable';
import OrderSlideOverContent from '@/components/admin/OrderSlideOverContent';
import { useParams } from 'next/navigation';
import { fetchAgentByCode } from '@/lib/agent';

export default function InsuranceOrders() {
    const params = useParams();
    const parent = typeof params?.child === 'string' && params.child ? params.child : typeof params?.parent === 'string' && params.parent ? params.parent : '1';

    const [parentid, setParentid] = useState<number>(1);
    const [open, setOpen] = useState(false);
    const [orders, setOrders] = useState<OrderDetails[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
    const [filtered, setFiltered] = useState<OrderDetails[]>([]);
    
    async function fetchOrders(): Promise<OrderDetails[]> {
        const res = parentid == 1 ? await fetch('/api/orders') : await fetch(`/api/orders/${parentid}`);
        const data = await res.json();
        return data;
    }

    useEffect(() => {
        fetchAgentByCode(parent).then( res => {
            setParentid(res.id);
            fetchOrders().then(data => {
                setOrders(data);
                setFiltered(data);
            });
        })
    }, []);

    return (
        <div>
            <div className='mb-6'>
                <h1 className='text-2xl font-bold'>Insurance Orders</h1>
                <p className='text-muted-foreground text-sm'>Manage Orders</p>
            </div>

            <InsuranceOrderTable orders={orders} filtered={filtered} setFiltered={setFiltered} setOpen={setOpen} setSelectedOrder={setSelectedOrder}/>


            <SlideOver open={open} onClose={() => setOpen(false)} title={`Order #${selectedOrder?.trackcode}`}>
                <OrderSlideOverContent selectedOrder={selectedOrder}/>
            </SlideOver>
        </div>
    );
}
