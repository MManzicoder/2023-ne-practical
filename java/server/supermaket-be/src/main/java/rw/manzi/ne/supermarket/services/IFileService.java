package rw.manzi.ne.supermarket.services;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;
import rw.manzi.ne.supermarket.enums.EFileStatus;
import rw.manzi.ne.supermarket.exceptions.InvalidFileException;
import rw.manzi.ne.supermarket.fileHandling.File;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

public interface IFileService {

        public List<File> getAll();

        public Page<File> getAll(Pageable pageable);

        public File getById(UUID id);

        public File create(MultipartFile document, String directory);

        public boolean delete(UUID id);

        public Page<File> getAllByStatus(Pageable pageable, EFileStatus status);

        public File uploadFile(MultipartFile file, String directory, UUID appointeeID) throws InvalidFileException, IOException;

        public String getFileExtension(String fileName);

        public String handleFileName(String fileName, UUID id) throws InvalidFileException;

        public boolean isValidExtension(String fileName) throws InvalidFileException;
}
