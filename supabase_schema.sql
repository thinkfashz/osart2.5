-- ElectroCore - Gamified Architecture Schema
-- Execute this in the Supabase SQL Editor

-- 1. Tabla de Perfiles (Gamificada)
create table if not exists profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  role text default 'user', -- 'admin' o 'user'
  knowledge_points integer default 0, -- Récord de conocimientos del juego
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Habilitar RLS en perfiles
alter table profiles enable row level security;

create policy "Los perfiles son legibles por todos"
  on profiles for select
  using ( true );

create policy "Usuarios pueden actualizar su propio perfil"
  on profiles for update
  using ( auth.uid() = id );

-- 2. Tabla de Productos
create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  price numeric not null,
  stock integer default 0,
  category text,
  image_url text,
  specs jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Habilitar RLS en productos
alter table products enable row level security;

create policy "Productos legibles por todos"
  on products for select
  using ( true );

-- 3. Tabla de Ordenes (Con Seguimiento Detallado)
create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id),
  total numeric not null,
  status text default 'pending', -- 'pending', 'paid', 'shipped', 'delivered'
  items jsonb,
  tracking_number text,
  shipping_date timestamp with time zone,
  delivery_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Habilitar RLS en ordenes
alter table orders enable row level security;

create policy "Usuarios pueden ver sus propias ordenes"
  on orders for select
  using ( auth.uid() = user_id );

-- 4. Trigger para crear perfil automáticamente al registrarse (Hardened)
create or replace function public.handle_new_user()
returns trigger 
language plpgsql 
security definer
set search_path = public, pg_catalog, auth
as $$
begin
  insert into public.profiles (id, email, full_name, role, knowledge_points)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    'user',
    0
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
