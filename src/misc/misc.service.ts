import { Injectable } from '@nestjs/common';
import { Apartment } from '../apartments/schemas/apartment.schema';
import { Functions } from './assets/functions';
import { Helpers } from './assets/helpers';
import { ApartmentsService } from '../apartments/apartments.service';
import { FullHtmlDto } from './dto/full-html.dto';


const cheerio = require('cheerio');

@Injectable()
export class MiscService {

  constructor(private apartmentsService: ApartmentsService) {
  }

  // create(createMiscDto: CreateMiscDto) {
  //   return 'This action adds a new misc';
  // }
  //
  // findAll() {
  //   return `This action returns all misc`;
  // }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} misc`;
  // }
  //
  // update(id: number, updateMiscDto: UpdateMiscDto) {
  //   return `This action updates a #${id} misc`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} misc`;
  // }

  async parseFullHtml( fullHtml: FullHtmlDto ) {

    // console.log(fullHtml);

    const reqBody = fullHtml;
    const $ = cheerio.load(reqBody.body);
    const apartmentId = reqBody.apartmentId;

    const apartment: Apartment = new Apartment();

    apartment.updated = $(Helpers.selectors.updated).text();
    apartment.summary = $(Helpers.selectors.summary).text();
    apartment.viaMakler = apartment.summary.includes('(תיווך)');


    apartment.city = $(Helpers.selectors.city).text();
    apartment.address = $(Helpers.selectors.address).text();
    apartment.area = $(Helpers.selectors.area).text().replace(/,$/, '');

    apartment.meters = $(Helpers.selectors.meters).text();
    apartment.floor = $(Helpers.selectors.floor).text();
    apartment.rooms = $(Helpers.selectors.rooms).text();

    apartment.price = $(Helpers.selectors.price).text().replace(/[^0-9]/gim, '');
    apartment.price = !!apartment.price ? apartment.price : null;

    apartment.about = $(Helpers.selectors.about).text();


    $(Helpers.selectors.featuresPresent).each((idx: number, el: Element) => {

      const featureName = Functions.snakeToCamel($(el).attr('id'));

      // @ts-ignore
      if (apartment[featureName] === undefined)
        console.log(featureName);
      // @ts-ignore
      apartment[featureName] = true;
    });

    $(Helpers.selectors.featuresAbsent).each((idx: number, el: Element) => {
      const featureName = Functions.snakeToCamel($(el).attr('id'));
      // @ts-ignore
      if (apartment[featureName] === undefined)
        console.log(featureName);
      // @ts-ignore
      apartment[featureName] = false;
    });

    $(Helpers.selectors.detailsField).each((idx: number, el: Element) => {

      const rawFieldName = $(el).find('.title').text();
      const rawFieldValue = $(el).find('.value').text();

      const fieldName = Helpers.translations[rawFieldName] !== undefined ? Helpers.translations[rawFieldName] : rawFieldName;
      const fieldValue = Helpers.translations[rawFieldValue] !== undefined ? Helpers.translations[rawFieldValue] : rawFieldValue;


      // @ts-ignore
      if (apartment[fieldName] === undefined)
        console.log(fieldName);

      // @ts-ignore
      apartment[fieldName] = fieldValue;
    });


    apartment.sellerPhone1 = $(Helpers.selectors.sellerPhone0).text().replace(/[^0-9]/gim, '');
    apartment.sellerPhone2 = $(Helpers.selectors.sellerPhone1).text().replace(/[^0-9]/gim, '');
    apartment.sellerName = $(Helpers.selectors.sellerName).text().trim();


    apartment.images = Array
      .from($(Helpers.selectors.photo))
      .map(el => {
        return $(el).attr('src').split('?')[0] + '?c=4&l=3';
      })
      .filter((v, i, a) => {
        return a.indexOf(v) === i;
      });

    apartment.video = $(Helpers.selectors.video).attr('src');

    // @ts-ignore
    apartment.houseCommittee = apartment.houseCommittee.replace(/[^0-9]/gim, '') - 0;


    // @ts-ignore
    apartment.arnona = (apartment.arnona + '')?.replace(/[^0-9]/gim, '');

    apartment.apartmentId = apartmentId;


    // console.log(apartment);
    // const dbResp =
    //   ApartmentModel.updateOne(
    //     {apartmentId: apartment.apartmentId, address: apartment.address},
    //     apartment,
    //     {upsert: true})

    // console.log(dbResp);

    const newApartment = await this.apartmentsService.create(apartment);
    // console.log(newApartment);

    // todo: return URL of apartment
    // todo: return status
    // todo: new dto

    return { status: 'ok', apartment: newApartment };
  }

  async getNewIds(apartmentIds: string[]) {

    return this.apartmentsService.getNewIds(apartmentIds)


    // const apartmentIdFound = await ApartmentModel
    //   .find({apartmentId: {$in: apartmentIds}})
    //   .distinct('apartmentId')
    //   .lean()
    // const apartmentIdsFiltered = apartmentIds.filter((ai: any) => {
    //   return (apartmentIdFound.indexOf(ai) === -1);
    // })
    //
    // // todo: TEMPORARY
    // // res.send(JSON.stringify(apartmentIds))
    // res.send(JSON.stringify(apartmentIdsFiltered))
    // logger.info(`${apartmentIdsFiltered.length} - ${apartmentIds.length}`)

  }
}
