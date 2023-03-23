package back.spring.final_back.concert.service;

import back.spring.final_back.concert.controller.ConcertController;
import back.spring.final_back.concert.repository.ConcertDao;
import back.spring.final_back.concert.repository.ConcertDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ConcertServiceImpl implements ConcertService{
    Logger logger = LoggerFactory.getLogger(ConcertServiceImpl.class);
    private final ConcertDao concertDao;

    @Override
    public List<ConcertDto> ConcertList() {
        logger.info("call ConcertServiceImpl.ConcertList");
        List<ConcertDto> cList = null;
        cList = concertDao.ConcertList();
        return cList;
    }

    @Override
    public List<ConcertDto> ConcertToday() {
        logger.info("call ConcertServiceImpl.ConcertToday");
        List<ConcertDto> cList = null;
        cList = concertDao.ConcertToday();
        return cList;
    }

    @Override
    public List<ConcertDto> ConcertSearch(String keyword) {
        List<ConcertDto> cList = null;
        cList = concertDao.ConcertSearch(keyword);
        return cList;
    }

    @Override
    public int ConcertInsert(ConcertDto concertDto) {
        int result = 0;
        result = concertDao.ConcertInsert(concertDto);
        return result;
    }

    @Override
    public int ConcertUpdate(ConcertDto concertDto) {
        int result = 0;
        result = concertDao.ConcertUpdate(concertDto);
        return result;
    }

    @Override
    public int ConcertDelete(int concert_no) {
        int result = 0;
        result = concertDao.ConcertDelete(concert_no);
        return result;
    }

}