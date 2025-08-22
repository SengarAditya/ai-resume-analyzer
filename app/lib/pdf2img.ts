// lib/pdf2img.ts

export interface PdfConversionResult {
    imageUrl: string;
    file: File | null;
    error?: string;
}

let pdfjsLib: any = null;
let isLoading = false;
let loadPromise: Promise<any> | null = null;

// Extend Window interface to include pdfjsLib
declare global {
    interface Window {
        pdfjsLib: any;
    }
}

async function loadPdfJs(): Promise<any> {
    if (pdfjsLib) return pdfjsLib;
    if (loadPromise) return loadPromise;

    isLoading = true;

    try {
        loadPromise = new Promise((resolve, reject) => {
            // Check if PDF.js is already loaded
            if (window.pdfjsLib) {
                pdfjsLib = window.pdfjsLib;
                // Set worker from CDN
                pdfjsLib.GlobalWorkerOptions.workerSrc =
                    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs';
                isLoading = false;
                resolve(pdfjsLib);
                return;
            }

            // Load PDF.js from CDN
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.mjs';
            script.type = 'module';

            script.onload = () => {
                // Wait a bit for the library to initialize
                setTimeout(() => {
                    if (window.pdfjsLib) {
                        pdfjsLib = window.pdfjsLib;

                        // Set worker from the same CDN version
                        pdfjsLib.GlobalWorkerOptions.workerSrc =
                            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs';

                        isLoading = false;
                        resolve(pdfjsLib);
                    } else {
                        reject(new Error('PDF.js failed to initialize'));
                    }
                }, 100);
            };

            script.onerror = () => reject(new Error('Failed to load PDF.js from CDN'));

            document.head.appendChild(script);
        });

        return loadPromise;

    } catch (err) {
        console.error('Failed to load PDF.js:', err);
        isLoading = false;
        loadPromise = null;
        throw err;
    }
}

export async function convertPdfToImage(
    file: File
): Promise<PdfConversionResult> {
    try {
        console.log('Starting PDF conversion...');
        const lib = await loadPdfJs();
        console.log('PDF.js loaded successfully');

        const arrayBuffer = await file.arrayBuffer();
        console.log('PDF file read into array buffer');

        const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
        console.log('PDF document loaded');

        const page = await pdf.getPage(1);
        console.log('First page extracted');

        const viewport = page.getViewport({ scale: 4 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        if (context) {
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = "high";
        }

        await page.render({ canvasContext: context!, viewport }).promise;
        console.log('PDF page rendered to canvas');

        return new Promise((resolve) => {
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        // Create a File from the blob with the same name as the pdf
                        const originalName = file.name.replace(/\.pdf$/i, "");
                        const imageFile = new File([blob], `${originalName}.png`, {
                            type: "image/png",
                        });

                        console.log('Image file created successfully');
                        resolve({
                            imageUrl: URL.createObjectURL(blob),
                            file: imageFile,
                        });
                    } else {
                        console.error('Failed to create blob from canvas');
                        resolve({
                            imageUrl: "",
                            file: null,
                            error: "Failed to create image blob",
                        });
                    }
                },
                "image/png",
                1.0
            );
        });
    } catch (err) {
        console.error('PDF conversion error:', err);
        return {
            imageUrl: "",
            file: null,
            error: `Failed to convert PDF: ${err}`,
        };
    }
}