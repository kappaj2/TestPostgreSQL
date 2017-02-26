package za.co.ajk.service.impl;

import za.co.ajk.service.RegionService;
import za.co.ajk.domain.Region;
import za.co.ajk.repository.RegionRepository;
import za.co.ajk.repository.search.RegionSearchRepository;
import za.co.ajk.service.dto.RegionDTO;
import za.co.ajk.service.mapper.RegionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Region.
 */
@Service
@Transactional
public class RegionServiceImpl implements RegionService{

    private final Logger log = LoggerFactory.getLogger(RegionServiceImpl.class);
    
    private final RegionRepository regionRepository;

    private final RegionMapper regionMapper;

    private final RegionSearchRepository regionSearchRepository;

    public RegionServiceImpl(RegionRepository regionRepository, RegionMapper regionMapper, RegionSearchRepository regionSearchRepository) {
        this.regionRepository = regionRepository;
        this.regionMapper = regionMapper;
        this.regionSearchRepository = regionSearchRepository;
    }

    /**
     * Save a region.
     *
     * @param regionDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public RegionDTO save(RegionDTO regionDTO) {
        log.debug("Request to save Region : {}", regionDTO);
        Region region = regionMapper.regionDTOToRegion(regionDTO);
        region = regionRepository.save(region);
        RegionDTO result = regionMapper.regionToRegionDTO(region);
        regionSearchRepository.save(region);
        return result;
    }

    /**
     *  Get all the regions.
     *  
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<RegionDTO> findAll() {
        log.debug("Request to get all Regions");
        List<RegionDTO> result = regionRepository.findAll().stream()
            .map(regionMapper::regionToRegionDTO)
            .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get one region by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public RegionDTO findOne(Long id) {
        log.debug("Request to get Region : {}", id);
        Region region = regionRepository.findOne(id);
        RegionDTO regionDTO = regionMapper.regionToRegionDTO(region);
        return regionDTO;
    }

    /**
     *  Delete the  region by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Region : {}", id);
        regionRepository.delete(id);
        regionSearchRepository.delete(id);
    }

    /**
     * Search for the region corresponding to the query.
     *
     *  @param query the query of the search
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<RegionDTO> search(String query) {
        log.debug("Request to search Regions for query {}", query);
        return StreamSupport
            .stream(regionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(regionMapper::regionToRegionDTO)
            .collect(Collectors.toList());
    }
}
