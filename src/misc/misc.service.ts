import { Injectable } from '@nestjs/common';
import { Apartment, ApartmentDocument } from '../apartments/schemas/apartment.schema';
import { Functions } from './assets/functions';
import { Helpers } from './assets/helpers';
import { ApartmentsService } from '../apartments/apartments.service';
import { FullHtmlDto } from './dto/full-html.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TopArea, TopAreaDocument } from '../topAreas/schemas/topArea.schema';
import { Area, AreaDocument } from '../areas/schemas/area.schema';
import { Hood, HoodDocument } from '../hoods/schemas/hood.schema';
import { City, CityDocument } from '../cities/schemas/city.schema';


const cheerio = require('cheerio');

@Injectable()
export class MiscService {

  constructor(
    private apartmentsService: ApartmentsService,
    @InjectModel(Apartment.name) private apartmentModel: Model<ApartmentDocument>,
    @InjectModel(TopArea.name) private topAreaModel: Model<TopAreaDocument>,
    @InjectModel(Area.name) private areaModel: Model<AreaDocument>,
    @InjectModel(Hood.name) private hoodModel: Model<HoodDocument>,
    @InjectModel(City.name) private cityModel: Model<CityDocument>,
  ) {
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

  async parseFullHtml(fullHtml: FullHtmlDto) {
    const reqBody = fullHtml;
    const $ = cheerio.load(reqBody.body);
    const apartmentId = reqBody.apartmentId;

    const apartment: Apartment = new Apartment();

    apartment.updated = $(Helpers.selectors.updated).text();
    apartment.summary = $(Helpers.selectors.summary).text();
    apartment.viaMakler = apartment.summary.includes('(תיווך)');


    apartment.city = $(Helpers.selectors.city).text();
    // apartment.address = $(Helpers.selectors.address).text();
    apartment.area = $(Helpers.selectors.area).text().replace(/,$/, '');

    apartment.meters = $(Helpers.selectors.meters).text();
    apartment.floor = $(Helpers.selectors.floor).text().replace(/[^0-9]/gim, '');
    apartment.rooms = $(Helpers.selectors.rooms).text();


    apartment.price = $(Helpers.selectors.price).text().replace(/[^0-9]/gim, '');
    apartment.price = !!apartment.price ? apartment.price : null;

    apartment.about = $(Helpers.selectors.about).text();


    $(Helpers.selectors.featuresPresent).each((idx: number, el: Element) => {

      const featureName = Functions.snakeToCamel($(el).attr('id'));

      // @ts-ignore
      // if (apartment[featureName] === undefined)
      //   console.log(featureName);
      // @ts-ignore
      apartment[featureName] = true;
    });

    $(Helpers.selectors.featuresAbsent).each((idx: number, el: Element) => {
      const featureName = Functions.snakeToCamel($(el).attr('id'));
      // @ts-ignore
      // if (apartment[featureName] === undefined)
      //   console.log(featureName);
      // @ts-ignore
      apartment[featureName] = false;
    });

    $(Helpers.selectors.detailsField).each((idx: number, el: Element) => {

      const rawFieldName = $(el).find('.title').text();
      const rawFieldValue = $(el).find('.value').text();

      const fieldName = Helpers.translations[rawFieldName] !== undefined ? Helpers.translations[rawFieldName] : rawFieldName;
      const fieldValue = Helpers.translations[rawFieldValue] !== undefined ? Helpers.translations[rawFieldValue] : rawFieldValue;


      // @ts-ignore
      // if (apartment[fieldName] === undefined)
      //   console.log(fieldName);

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

    // const newApartment = await this.apartmentsService.create(apartment);
    // console.log(newApartment);

    // todo: return URL of apartment
    // todo: return status
    // todo: new dto

    return { status: 'ok' };
    // return { status: 'ok', apartment: newApartment };
  }

  async getNewIds(apartmentIds: string[]) {

    // return this.apartmentsService.getNewIds(apartmentIds);


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

  parseRawJson(rawJson) {
    const address = rawJson.address;
    const apartments = rawJson.feed.feed_items;
    apartments
      .filter(apt => apt.type === 'ad')
      .forEach(async (apt) => {
        const apartment: Partial<Apartment> = {};
        apartment.coordinates = apt.coordinates;

        const imgKeys = apt.images ? Object.keys(apt.images) : null;
        apartment.images = imgKeys?.map(ik => apt.images[ik].src);
        // console.log(apartment.images);


        apartment.viaMakler = apt.merchant;
        apartment.apartmentId = apt.link_token;
        apartment.video = apt.video_url;

        const upadtedSplitted = apt.updated_at.replace(/[^0-9\/]/gim, '')?.split('/').filter(upd => !!upd);
        apartment.updated = upadtedSplitted && upadtedSplitted.length ? new Date(upadtedSplitted[2], upadtedSplitted[1] - 1, upadtedSplitted[0]) : new Date();
        apartment.price = apt.price.replace(/[^0-9]/gim, '');


        const optionsPayload = {
          upsert: true,
          useFindAndModify: false,
          new: true,
        };

        const topAreaPayload: TopArea = {
          name: address.topArea.name,
          topAreaId: address.topArea.id,
        };
        const topArea = await this.topAreaModel.findOneAndUpdate({ topAreaId: topAreaPayload.topAreaId }, topAreaPayload, optionsPayload);


        const areaPayload: Area = {
          name: apt.AreaID_text,
          areaId: apt.area_id,
          topAreaId: topArea._id,
        };
        const area = await this.areaModel.findOneAndUpdate({ areaId: areaPayload.areaId }, areaPayload, optionsPayload);


        const cityPayload: City = {
          name: apt.city,
          cityId: apt.city_code,
          areaId: area._id,
          topAreaId: topArea._id,
        };
        const city = await this.cityModel.findOneAndUpdate({ cityId: cityPayload.cityId }, cityPayload, optionsPayload);


        const hoodPayload: Hood = {
          name: apt.neighborhood,
          hoodId: apt.hood_id,
          cityId: city._id,
          areaId: area._id,
          topAreaId: topArea._id,
        };
        const hood = await this.hoodModel.findOneAndUpdate({ hoodId: hoodPayload.hoodId }, hoodPayload, optionsPayload);

        apartment.topArea = topArea.name;
        apartment.topAreaId = topArea._id;

        apartment.area = area.name;
        apartment.areaId = area._id;

        apartment.city = city.name;
        apartment.cityId = city._id;

        apartment.hood = hood.name;
        apartment.hoodId = hood._id;

        //city_code:

        apartment.street = apt.street;
        apartment.homeNumber = apt.address_home_number;
        apartment.urgentEntrance = !!apt.Immediate_text;
        apartment.forPartners = !!apt.Partner_text;
        apartment.added = new Date(apt.date_added);
        apartment.conditioning = !!apt.AirConditioner_text;
        apartment.mamad = !!apt.mamad_text;
        apartment.tadiran = !!apt.Tadiran_text;
        apartment.furniture = !!apt.Furniture_text;
        apartment.sunpatio = !!apt.sunpatio_text;
        apartment.columns = !!apt.Amudim_text;
        apartment.storeroom = !!apt.storeroom_text;
        apartment.accessForDisabled = !!apt.handicapped_text;
        apartment.parking = !!apt.Parking_text;
        apartment.pets = !!apt.PetsInHouse_text;
        apartment.elevator = !!apt.Elevator_text;
        apartment.communal = !!apt.yehidatdiur_text;
        apartment.rooms = apt.Rooms_text;
        apartment.entryDate = new Date(apt.date_of_entry);
        apartment.patio = !!apt.patio_text;
        apartment.renovated = !!apt.Meshupatz_text;
        apartment.longTerm = !!apt.LongTerm_text;
        apartment.pandoraDoors = !!apt.PandorDoors_text;
        apartment.meters = apt.square_meters;

        apartment.floor = apt.row_4[1].value;
        // contacts get by demand
        // console.log(apt);


        this.apartmentModel.findOneAndUpdate(
          { apartmentId: apartment.apartmentId },
          apartment,
          optionsPayload,
        )
          .then(apt1 => {
            // console.log(apt1);
          })
          .catch(err => {
            // console.log(err);
          });

        // this.topAreaModel.updateOne({
        //   name:apt.topAreaID_text,
        //   code:apt.
        //
        // })
        //
        //
        // this.cityModel.updateOne({
        //   name:apt.city,
        //
        // })
        //
        //
      });


    // console.log(JSON.stringify(rawJson));
    // console.log(rawJson.address);
    // console.log(
    //   rawJson
    //     .feed
    //     .feed_items
    //     .filter(fi=>fi.type!=='advanced_ad')
    //     .filter(fi=>fi.type!=='agency_buttons')
    //     .map(fi=>Object.keys(fi).filter(fik=>fik.includes('_text')).sort().join(" "))
    //   [0]
    // );
    // console.log('\n------\n')
    // console.log(
    //   rawJson
    //     .feed
    //     .feed_items
    //     .filter(fi=>fi.type!=='advanced_ad')
    //     .filter(fi=>fi.type!=='agency_buttons')
    //     .map(fi=>Object.keys(fi).filter(fik=>!fik.includes('_text')).sort().join(" "))
    //   [0]
    // );

  }

  parseFullRawJson(fullRawJson) {
    const apartmentPayload: Partial<Apartment> = {};
    const optionsPayload = {
      upsert: true,
      useFindAndModify: false,
      new: true,
    };

    apartmentPayload.totalFloors = fullRawJson.TotalFloor_text;
    apartmentPayload.apartmentId = fullRawJson.link_token;
    apartmentPayload.balconies = fullRawJson.balconies;
    apartmentPayload.houseCommittee = fullRawJson.HouseCommittee.replace(/[^0-9]/gim, '');
    apartmentPayload.elevator = fullRawJson.additional_info_items_v2.find(zz => zz.key === 'elevator').value;
    apartmentPayload.pets = fullRawJson.additional_info_items_v2.find(zz => zz.key === 'pets').value;

    console.log(apartmentPayload);

    this.apartmentModel.findOneAndUpdate(
      { apartmentId: apartmentPayload.apartmentId },
      apartmentPayload,
      optionsPayload,
    )
      .then(apt1 => {
        // console.log(apt1);
      })
      .catch(err => {
        // console.log(err);
      });


  }
}
