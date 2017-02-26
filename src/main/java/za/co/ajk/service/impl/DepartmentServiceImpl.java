package za.co.ajk.service.impl;

import za.co.ajk.service.DepartmentService;
import za.co.ajk.domain.Department;
import za.co.ajk.repository.DepartmentRepository;
import za.co.ajk.repository.search.DepartmentSearchRepository;
import za.co.ajk.service.dto.DepartmentDTO;
import za.co.ajk.service.mapper.DepartmentMapper;
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
 * Service Implementation for managing Department.
 */
@Service
@Transactional
public class DepartmentServiceImpl implements DepartmentService{

    private final Logger log = LoggerFactory.getLogger(DepartmentServiceImpl.class);
    
    private final DepartmentRepository departmentRepository;

    private final DepartmentMapper departmentMapper;

    private final DepartmentSearchRepository departmentSearchRepository;

    public DepartmentServiceImpl(DepartmentRepository departmentRepository, DepartmentMapper departmentMapper, DepartmentSearchRepository departmentSearchRepository) {
        this.departmentRepository = departmentRepository;
        this.departmentMapper = departmentMapper;
        this.departmentSearchRepository = departmentSearchRepository;
    }

    /**
     * Save a department.
     *
     * @param departmentDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public DepartmentDTO save(DepartmentDTO departmentDTO) {
        log.debug("Request to save Department : {}", departmentDTO);
        Department department = departmentMapper.departmentDTOToDepartment(departmentDTO);
        department = departmentRepository.save(department);
        DepartmentDTO result = departmentMapper.departmentToDepartmentDTO(department);
        departmentSearchRepository.save(department);
        return result;
    }

    /**
     *  Get all the departments.
     *  
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DepartmentDTO> findAll() {
        log.debug("Request to get all Departments");
        List<DepartmentDTO> result = departmentRepository.findAll().stream()
            .map(departmentMapper::departmentToDepartmentDTO)
            .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get one department by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public DepartmentDTO findOne(Long id) {
        log.debug("Request to get Department : {}", id);
        Department department = departmentRepository.findOne(id);
        DepartmentDTO departmentDTO = departmentMapper.departmentToDepartmentDTO(department);
        return departmentDTO;
    }

    /**
     *  Delete the  department by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Department : {}", id);
        departmentRepository.delete(id);
        departmentSearchRepository.delete(id);
    }

    /**
     * Search for the department corresponding to the query.
     *
     *  @param query the query of the search
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DepartmentDTO> search(String query) {
        log.debug("Request to search Departments for query {}", query);
        return StreamSupport
            .stream(departmentSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(departmentMapper::departmentToDepartmentDTO)
            .collect(Collectors.toList());
    }
}
