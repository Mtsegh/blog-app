import * as cheerio from "cheerio";
import { uploadToCloudinary } from "./cloudinary.uploader.js";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const str = `<p>phinehas</p><p><img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/4gxYSUNDX1BST0ZJTEUAAQEAAAxITGlubwIQAABtbnRyayJOOR5GpHgihrYPsMoYx4FgeT1vJ6LJ+aDoX1Pz//Z"></p>`

const extractBase64Images = (html) => {
    const $ = cheerio.load(html);
    let images = []

    $("img").each((_, img) => {
        const src = $(img).attr("src");
        if (src && src.startsWith("data:image")) {
            images.push(src);
        }
    });

    return images
}

const replaceBase64WithLinks = (html, links) => {
    const $ = cheerio.load(html);
    let index = 0;

    $("img").each((_, img) => {
        const src = $(img).attr("src");
        if (src && src.startsWith("data:image")) {
            $(img).attr("src", links[index]);
            index++;
        }
    });
    return $.html()
}

// const result = extractBase64Images(str)
// // console.log(result);

const proccessBlogHtml = async (html) => {
    try {
        const window = new JSDOM("").window;
        const DOMPurify = createDOMPurify(window);
        const base64Images = extractBase64Images(html);
        if (base64Images.length === 0) return html;
    
        const uploadedLinks = await uploadToCloudinary(base64Images);
        const finalHtml = replaceBase64WithLinks(html, uploadedLinks);
        const cleanHtml = DOMPurify.sanitize(finalHtml);
        // console.log("after DOM handling: ", cleanHtml);
    
        return cleanHtml;
    } catch (error) {
        // console.log("Error in update processBlogHtml controller: ", error);
        throw new Error("error in process Html", error.messae);
    }
}

function isBase64Image(str) {
    return typeof str === "string" && str.startsWith("data:image");
}

export async function handleBase64OrLink(image) {
    try {
        if (isBase64Image(image)) {
            const savedCoverImg = await uploadToCloudinary([image]);
            return savedCoverImg[0]
        } else {
            return image
        }
    } catch (error) {
        throw new Error(error);
    }
}

export default proccessBlogHtml;