param(
  [Parameter(Mandatory = $true)]
  [string]$InputVideo,

  [Parameter(Mandatory = $true)]
  [string]$OutputImage,

  [int]$Width = 1280,
  [int]$Height = 720
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

$source = @"
using System;
using System.Drawing;
using System.Runtime.InteropServices;

[ComImport]
[Guid("bcc18b79-ba16-442f-80c4-8a59c30c463b")]
[InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
interface IShellItemImageFactory
{
    void GetImage(SIZE size, SIIGBF flags, out IntPtr phbm);
}

[StructLayout(LayoutKind.Sequential)]
struct SIZE
{
    public int cx;
    public int cy;
}

[Flags]
enum SIIGBF
{
    ResizeToFit = 0x00,
    BiggerSizeOk = 0x01,
    MemoryOnly = 0x02,
    IconOnly = 0x04,
    ThumbnailOnly = 0x08,
    InCacheOnly = 0x10,
    CropToSquare = 0x20,
    WideThumbnail = 0x40,
    IconBackground = 0x80,
    ScaleUp = 0x100
}

public static class ShellThumbnailProvider
{
    [DllImport("shell32.dll", CharSet = CharSet.Unicode, PreserveSig = false)]
    private static extern void SHCreateItemFromParsingName(
        string path,
        IntPtr pbc,
        ref Guid riid,
        [MarshalAs(UnmanagedType.Interface)] out IShellItemImageFactory imageFactory);

    [DllImport("gdi32.dll")]
    [return: MarshalAs(UnmanagedType.Bool)]
    private static extern bool DeleteObject(IntPtr hObject);

    public static Bitmap GetThumbnail(string path, int width, int height)
    {
        Guid guid = new Guid("bcc18b79-ba16-442f-80c4-8a59c30c463b");
      IShellItemImageFactory imageFactory;
      SHCreateItemFromParsingName(path, IntPtr.Zero, ref guid, out imageFactory);

        SIZE size;
        size.cx = width;
        size.cy = height;

        IntPtr hBitmap;
        imageFactory.GetImage(size, SIIGBF.BiggerSizeOk | SIIGBF.ThumbnailOnly | SIIGBF.ScaleUp, out hBitmap);

        try
        {
            return Image.FromHbitmap(hBitmap);
        }
        finally
        {
            DeleteObject(hBitmap);
        }
    }
}
"@

if (-not ("ShellThumbnailProvider" -as [type])) {
  Add-Type -TypeDefinition $source -ReferencedAssemblies System.Drawing
}

$inputPath = (Resolve-Path $InputVideo).Path
$outputPath = $ExecutionContext.SessionState.Path.GetUnresolvedProviderPathFromPSPath($OutputImage)
$outputDirectory = Split-Path -Parent $outputPath
if (-not (Test-Path $outputDirectory)) {
  New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null
}

$bitmap = [ShellThumbnailProvider]::GetThumbnail($inputPath, $Width, $Height)
try {
  $bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
}
finally {
  $bitmap.Dispose()
}

Write-Output ("Saved thumbnail to {0}" -f $outputPath)
