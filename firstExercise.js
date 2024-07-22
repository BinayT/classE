
/* 
Explanation of the problems with the code/structure.

Problem-> The (RegisteredUser) class is handling too much responsibility because of checking pricing. This logic should be seperated to seperate the concern.
Also it affects the scalability, because the current design does not scale well with the addition of new types of services or content. 
It becomes cumbersome to manage multiple if-else statements. For this the soultion would be "Encapsulation", that means each service and content type 
encapsulates its price calculation logic, adhering to the single responsibility principle.

Problem-> It relies on typeof checks, which makes the code fragile and hard to maintain & violates open/closed priciple in software developement that states that software entities
hould be open for extension but closed for modification.
*/


// Class based solution

class RegisteredUser {
    constructor(services = []) {
        this.services = services;
    }

    static calculateStreamingPrice(multimediaContent) {
        let price = multimediaContent.streamingPrice;
        if (multimediaContent.isPremium) {
            price += multimediaContent.additionalFee;
        }
        return price;
    }

    static calculateDownloadPrice(multimediaContent) {
        let price = multimediaContent.downloadPrice;
        if (multimediaContent.isPremium) {
            price += multimediaContent.additionalFee;
        }
        return price;
    }

    getTotal() {
        return this.services.reduce((total, service) => {
            let multimediaContent = service.getMultimediaContent();

            if (service.type === 'StreamingService') {
                total += RegisteredUser.calculateStreamingPrice(multimediaContent);
            } else if (service.type === 'DownloadService') {
                total += RegisteredUser.calculateDownloadPrice(multimediaContent);
            }

            return total;
        }, 0);
    }
}

// Functional version of the solution!

function calculateStreamingPrice(multimediaContent) {
    let price = multimediaContent.streamingPrice;
    if (multimediaContent.isPremium) {
        price += multimediaContent.additionalFee;
    }
    return price;
}

function calculateDownloadPrice(multimediaContent) {
    let price = multimediaContent.downloadPrice;
    if (multimediaContent.isPremium) {
        price += multimediaContent.additionalFee;
    }
    return price;
}

function getTotal(services) {
    return services.reduce((total, service) => {
        let multimediaContent = service.getMultimediaContent();

        if (service.type === 'StreamingService') {
            total += calculateStreamingPrice(multimediaContent);
        } else if (service.type === 'DownloadService') {
            total += calculateDownloadPrice(multimediaContent);
        }

        return total;
    }, 0);
}