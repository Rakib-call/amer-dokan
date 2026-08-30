-- ============================================================
-- এই SQL ফাইলটি Supabase প্রজেক্টের SQL Editor-এ রান করুন
-- (Supabase Dashboard -> SQL Editor -> New query -> পুরোটা পেস্ট করে Run চাপুন)
-- ============================================================

-- প্রোডাক্ট টেবিল
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default 'other',
  price numeric not null default 0,
  offer_price numeric,
  image text,
  description text,
  stock int not null default 0,
  created_at timestamptz not null default now()
);

-- অর্ডার টেবিল
create table if not exists orders (
  id text primary key,
  items jsonb not null default '[]',
  total numeric not null default 0,
  customer_name text not null,
  phone text not null,
  address text not null,
  payment text not null default 'cod',
  txn_id text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

-- সেটিংস টেবিল (শুধু এক সারি — id সবসময় 1)
create table if not exists settings (
  id int primary key default 1,
  shop_name text not null default 'আপনার দোকান',
  offer_banner text not null default 'নতুন কালেকশনে পেয়ে যান বিশেষ ছাড়',
  bkash text default '',
  nagad text default '',
  bank_name text default '',
  bank_account_name text default '',
  bank_account_number text default '',
  admin_password text not null default 'admin123'
);

insert into settings (id) values (1) on conflict (id) do nothing;

-- কিছু নমুনা প্রোডাক্ট (চাইলে মুছে দিতে পারেন)
insert into products (name, category, price, offer_price, image, description, stock) values
  ('কটন পাঞ্জাবি', 'cloth', 1200, 950, 'https://placehold.co/500x600/1B2A4A/FAF6EE?text=Panjabi', 'আরামদায়ক সুতি কাপড়ের পাঞ্জাবি।', 25),
  ('লেদার স্নিকার্স', 'shoe', 2200, 1799, 'https://placehold.co/500x600/23262B/FAF6EE?text=Sneakers', 'টেকসই লেদার স্নিকার্স।', 18),
  ('ক্লাসিক এনালগ ঘড়ি', 'watch', 1800, 1450, 'https://placehold.co/500x600/D9A441/23262B?text=Watch', 'স্টেইনলেস স্টিল বডির ক্লাসিক ঘড়ি।', 15)
on conflict do nothing;

-- ============================================================
-- Row Level Security (RLS)
-- এই প্রজেক্টে অ্যাডমিন লগইন পাসওয়ার্ড শুধু ফ্রন্টএন্ডে চেক হয় (Supabase Auth
-- ব্যবহার হয়নি), তাই নিচের পলিসিগুলো anon key-কে products/orders/settings-এ
-- সরাসরি পড়া-লেখার অনুমতি দেয়। ছোট ব্যবসার জন্য এটা ঠিক আছে, কিন্তু কেউ চাইলে
-- ব্রাউজারের ডেভেলপার টুল দিয়ে ডেটাবেস পরিবর্তন করতে পারবে। আরও নিরাপত্তার
-- জন্য পরবর্তীতে Supabase Auth যোগ করার পরামর্শ দেওয়া হলো।
-- ============================================================

alter table products enable row level security;
alter table orders enable row level security;
alter table settings enable row level security;

create policy "public read products" on products for select using (true);
create policy "public write products" on products for insert with check (true);
create policy "public update products" on products for update using (true);
create policy "public delete products" on products for delete using (true);

create policy "public read orders" on orders for select using (true);
create policy "public create orders" on orders for insert with check (true);
create policy "public update orders" on orders for update using (true);

create policy "public read settings" on settings for select using (true);
create policy "public update settings" on settings for update using (true);
