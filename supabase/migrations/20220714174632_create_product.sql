CREATE TABLE IF NOT EXISTS public.product
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text),
    code text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    model text COLLATE pg_catalog."default",
    "imgRef" text COLLATE pg_catalog."default",
    CONSTRAINT product_pkey PRIMARY KEY (id),
    CONSTRAINT product_code_key UNIQUE (code)
)

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.product
    OWNER to postgres;

GRANT ALL ON TABLE public.product TO anon;

GRANT ALL ON TABLE public.product TO authenticated;

GRANT ALL ON TABLE public.product TO postgres;

GRANT ALL ON TABLE public.product TO service_role;

