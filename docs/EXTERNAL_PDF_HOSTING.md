# External PDF Hosting

This document explains how to configure external PDF hosting for ebooks, allowing you to serve PDFs from external URLs (Supabase Storage, S3, Cloudflare R2, etc.) instead of local files.

## Overview

By default, PDFs are served from `/public/pdfs/` as static files. You can configure the system to use external URLs by setting environment variables.

## Configuration Options

### Option 1: Base URL for All PDFs

Set a base URL that will be used for all PDFs:

```env
NEXT_PUBLIC_PDF_BASE_URL=https://xxx.supabase.co/storage/v1/object/public/pdfs
# or
NEXT_PUBLIC_PDF_BASE_URL=https://yourbucket.s3.amazonaws.com/pdfs
# or
NEXT_PUBLIC_PDF_BASE_URL=https://your-account.r2.cloudflarestorage.com/pdfs
```

All PDFs will be accessed as: `{BASE_URL}/{filename}`

**Example**: If `BASE_URL` is `https://xxx.supabase.co/storage/v1/object/public/pdfs` and filename is `ebook-1.pdf`, the final URL will be:

```
https://xxx.supabase.co/storage/v1/object/public/pdfs/ebook-1.pdf
```

### Option 2: Individual PDF URLs

Override specific PDFs with custom URLs:

```env
NEXT_PUBLIC_PDF_1_URL=https://custom-url.com/path/to/ebook-1.pdf
NEXT_PUBLIC_PDF_2_URL=https://another-url.com/ebook-2.pdf
# ... and so on for PDF_3_URL through PDF_10_URL
```

Individual URLs take priority over the base URL.

### Option 3: Mixed Approach

Use base URL for most PDFs, but override specific ones:

```env
NEXT_PUBLIC_PDF_BASE_URL=https://xxx.supabase.co/storage/v1/object/public/pdfs
NEXT_PUBLIC_PDF_5_URL=https://special-cdn.com/ebook-5.pdf
```

## Behavior Changes

When external URLs are configured:

1. **Download Button**: Opens the PDF in a new tab (redirect) instead of downloading locally
2. **View Button**: Opens the PDF in a modal with an iframe pointing to the external URL
3. **PDF Modal**: Shows the external PDF directly in the iframe

## Example: Supabase Storage Setup

1. **Upload PDFs to Supabase Storage**:
   - Go to your Supabase project
   - Navigate to Storage
   - Create a bucket named `pdfs` (or your preferred name)
   - Upload all 10 ebook PDFs
   - Make sure the bucket is **public**

2. **Get the Public URL**:

   ```
   https://{your-project-id}.supabase.co/storage/v1/object/public/pdfs
   ```

3. **Configure in `.env.local`**:

   ```env
   NEXT_PUBLIC_PDF_BASE_URL=https://xxx.supabase.co/storage/v1/object/public/pdfs
   ```

4. **Redeploy** your application

## Example: AWS S3 Setup

1. **Create an S3 bucket** and upload PDFs

2. **Configure bucket as public** or use signed URLs (requires server-side logic)

3. **Get the bucket URL**:

   ```
   https://yourbucket.s3.amazonaws.com/pdfs
   ```

4. **Configure in `.env.local`**:
   ```env
   NEXT_PUBLIC_PDF_BASE_URL=https://yourbucket.s3.amazonaws.com/pdfs
   ```

## Example: Cloudflare R2 Setup

1. **Create an R2 bucket** and upload PDFs

2. **Get the public URL** from your R2 settings

3. **Configure in `.env.local`**:
   ```env
   NEXT_PUBLIC_PDF_BASE_URL=https://your-account.r2.cloudflarestorage.com/pdfs
   ```

## Fallback Behavior

If no external URLs are configured:

- PDFs fall back to local `/public/pdfs/` files
- Download button works normally (triggers download)
- View button opens PDF in modal from local files

## Benefits

✅ **Reduced bundle size**: PDFs don't need to be included in your deployment
✅ **Better CDN performance**: Use specialized CDN services
✅ **Scalability**: External storage scales better for large files
✅ **Cost optimization**: Many CDN services offer free tiers or better pricing for storage
✅ **Flexibility**: Easy to switch between hosting providers

## Notes

- External URLs must be publicly accessible (no authentication required)
- For private PDFs, you'll need to implement signed URLs with server-side logic
- Make sure CORS is properly configured on your storage service if needed
- PDFs opened in modal may be subject to CORS restrictions depending on the host
